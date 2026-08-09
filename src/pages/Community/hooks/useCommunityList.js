import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  fetchCommunityPosts,
  fetchCommunityPostsPage,
  fetchMyCommunityComments,
  fetchPopularCommunityPosts,
} from "../../../services/communityApi";
import { subscribeToCommunityChanges } from "../../../services/communityRealtime";

const DEFAULT_PAGE_SIZE = 10;
const POPULAR_POST_LIMIT = 10;
const COMMUNITY_LIST_QUERY_KEY = "community-list";

const createEmptyCommunityListData = () => ({
  myComments: [],
  popularPosts: [],
  posts: [],
  totalCount: 0,
});

const fetchCommunityListData = async ({
  category,
  currentPage,
  pageSize,
  searchKeyword,
  sortBy,
  userId,
}) => {
  if (category === "my-comments") {
    const [postData, commentData, popularPostData] = await Promise.all([
      fetchCommunityPosts(),
      fetchMyCommunityComments(userId),
      fetchPopularCommunityPosts(POPULAR_POST_LIMIT),
    ]);

    return {
      myComments: commentData,
      popularPosts: popularPostData,
      posts: postData,
      totalCount: postData.length,
    };
  }

  const [postPage, popularPostData] = await Promise.all([
    fetchCommunityPostsPage({
      category,
      page: currentPage,
      pageSize,
      searchKeyword,
      sortBy,
      userId,
    }),
    fetchPopularCommunityPosts(POPULAR_POST_LIMIT),
  ]);

  return {
    myComments: [],
    popularPosts: popularPostData,
    posts: postPage.posts,
    totalCount: postPage.totalCount,
  };
};

const useCommunityList = ({
  category,
  currentPage,
  pageSize = DEFAULT_PAGE_SIZE,
  searchKeyword,
  sortBy,
  userId,
}) => {
  const queryClient = useQueryClient();
  const queryKey = [
    COMMUNITY_LIST_QUERY_KEY,
    {
      category,
      currentPage,
      pageSize,
      searchKeyword,
      sortBy,
      userId: userId ?? "",
    },
  ];

  const { data, error, isPending } = useQuery({
    queryKey,
    queryFn: () =>
      fetchCommunityListData({
        category,
        currentPage,
        pageSize,
        searchKeyword,
        sortBy,
        userId,
      }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const unsubscribe = subscribeToCommunityChanges({
      channelName: "community-post-list",
      onChange: () =>
        queryClient.invalidateQueries({
          queryKey: [COMMUNITY_LIST_QUERY_KEY],
        }),
    });

    return unsubscribe;
  }, [queryClient]);

  if (error) {
    console.error("커뮤니티 게시글 조회 오류:", error);
  }

  const communityListData = data ?? createEmptyCommunityListData();

  return {
    errorMessage: error ? "게시글을 불러오지 못했습니다." : "",
    isLoading: isPending,
    myComments: communityListData.myComments,
    popularPosts: communityListData.popularPosts,
    posts: communityListData.posts,
    totalCount: communityListData.totalCount,
  };
};

export default useCommunityList;
