create index if not exists community_posts_category_created_at_idx
  on public.community_posts(category, created_at desc);

create index if not exists community_comments_post_id_idx
  on public.community_comments(post_id);

create index if not exists community_post_reactions_post_id_reaction_idx
  on public.community_post_reactions(post_id, reaction);

create or replace function public.get_community_post_page(
  target_category text default 'all',
  target_user_id text default null,
  search_keyword text default '',
  sort_key text default 'latest',
  page_offset integer default 0,
  page_limit integer default 10
)
returns table (
  post_id bigint,
  comment_count bigint,
  support_count bigint,
  total_count bigint
)
language sql
stable
security definer
set search_path = public
as $$
  with filtered_posts as (
    select
      p.id,
      p.created_at,
      coalesce(p.view_count, 0) as view_count
    from public.community_posts p
    where (
      case
        when target_category = 'my-posts' then
          target_user_id is not null
          and target_user_id <> ''
          and p.user_id::text = target_user_id
        when target_category is not null
          and target_category <> ''
          and target_category not in ('all', 'my-comments', 'my-posts') then
          p.category = target_category
        else true
      end
    )
    and (
      search_keyword is null
      or trim(search_keyword) = ''
      or p.title ilike (
        '%' ||
        replace(
          replace(
            replace(trim(search_keyword), '\', '\\'),
            '%',
            '\%'
          ),
          '_',
          '\_'
        ) ||
        '%'
      ) escape '\'
      or p.author_name ilike (
        '%' ||
        replace(
          replace(
            replace(trim(search_keyword), '\', '\\'),
            '%',
            '\%'
          ),
          '_',
          '\_'
        ) ||
        '%'
      ) escape '\'
    )
  ),
  post_counts as (
    select
      fp.id,
      fp.created_at,
      fp.view_count,
      (
        select count(*)
        from public.community_comments c
        where c.post_id = fp.id
      ) as comment_count,
      (
        select count(*)
        from public.community_post_reactions r
        where r.post_id = fp.id
          and r.reaction = 'like'
      ) as support_count
    from filtered_posts fp
  ),
  counted_posts as (
    select
      pc.*,
      count(*) over () as total_count
    from post_counts pc
  )
  select
    cp.id as post_id,
    cp.comment_count,
    cp.support_count,
    cp.total_count
  from counted_posts cp
  order by
    case when sort_key = 'support' then cp.support_count end desc nulls last,
    case when sort_key = 'popular' then cp.view_count end desc nulls last,
    cp.created_at desc,
    cp.id desc
  offset greatest(coalesce(page_offset, 0), 0)
  limit greatest(coalesce(page_limit, 10), 1);
$$;

grant execute on function public.get_community_post_page(
  text,
  text,
  text,
  text,
  integer,
  integer
) to anon, authenticated;
