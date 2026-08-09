drop function if exists public.get_match_prediction_stats();
drop function if exists public.get_match_prediction_stats(bigint[]);

create or replace function public.get_match_prediction_stats(
  target_match_ids bigint[] default null
)
returns table (
  match_id bigint,
  participant_count bigint,
  home_rate numeric,
  away_rate numeric
)
language sql
stable
security definer
set search_path = public
as $$
  with prediction_counts as (
    select
      m.id as match_id,
      count(p.*) as participant_count,
      count(p.*) filter (
        where upper(coalesce(p.selected_team_code, '')) =
          upper(coalesce(m.home_team_code, ''))
      ) as home_count,
      count(p.*) filter (
        where upper(coalesce(p.selected_team_code, '')) =
          upper(coalesce(m.away_team_code, ''))
      ) as away_count
    from public.matches m
    left join public.predictions p
      on p.match_id = m.id
    where target_match_ids is null
      or m.id = any(target_match_ids)
    group by m.id
  )
  select
    prediction_counts.match_id,
    prediction_counts.participant_count,
    case
      when prediction_counts.participant_count = 0 then 50
      else round(
        (prediction_counts.home_count::numeric /
          prediction_counts.participant_count::numeric) * 100,
        1
      )
    end as home_rate,
    case
      when prediction_counts.participant_count = 0 then 50
      else round(
        (prediction_counts.away_count::numeric /
          prediction_counts.participant_count::numeric) * 100,
        1
      )
    end as away_rate
  from prediction_counts;
$$;

grant execute on function public.get_match_prediction_stats(bigint[])
  to anon, authenticated;
