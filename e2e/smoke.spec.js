import { expect, test } from "@playwright/test";
import { mockSupabase } from "./support/mockSupabase.js";

test.beforeEach(async ({ page }) => {
  await mockSupabase(page);
});

test("home renders public landing sections", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /FANPICK\s+MATCH DAY/i }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "MATCHES" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "HOT MATCH" })).toBeVisible();
});

test("community support sort stays usable with server pagination", async ({
  page,
}) => {
  await page.goto("/community");

  await expect(page.getByRole("heading", { name: "COMMUNITY" })).toBeVisible();

  const supportSortButton = page.getByRole("button", { name: "응원순" });

  await supportSortButton.click();
  await expect(supportSortButton).toHaveClass(/activeSort/);
  await expect(page.getByText("등록된 게시글이 없습니다.")).toBeVisible();
});

test("community list reuses cached query on route revisit", async ({ page }) => {
  const communityRequests = [];

  page.on("request", (request) => {
    const url = request.url();
    const isCommunityListRequest =
      request.method() !== "OPTIONS" &&
      (url.includes("/rest/v1/rpc/get_community_post_page") ||
        url.includes("/rest/v1/community_posts") ||
        url.includes("/rest/v1/community_comments") ||
        url.includes("/rest/v1/community_post_reactions") ||
        url.includes("/rest/v1/profiles"));

    if (isCommunityListRequest) {
      communityRequests.push(url);
    }
  });

  await page.goto("/community");
  await expect(page.getByText("등록된 게시글이 없습니다.")).toBeVisible();

  const firstVisitRequestCount = communityRequests.length;

  expect(firstVisitRequestCount).toBeGreaterThan(0);

  await page.getByRole("link", { name: "FAN PICK 홈으로 이동" }).click();
  await expect(
    page.getByRole("heading", { name: /FANPICK\s+MATCH DAY/i }),
  ).toBeVisible();

  await page.getByRole("link", { name: "COMMUNITY" }).first().click();
  await expect(page.getByText("등록된 게시글이 없습니다.")).toBeVisible();
  expect(communityRequests).toHaveLength(firstVisitRequestCount);
});

test("prediction page protects my prediction tab for anonymous users", async ({
  page,
}) => {
  await page.goto("/prediction");

  await expect(page.getByRole("heading", { name: "승부 예측" })).toBeVisible();
  await expect(page.getByRole("button", { name: "오늘의 경기" })).toBeVisible();
  await expect(page.getByLabel("예측 경기 검색")).toBeVisible();
  await expect(
    page.getByText("이 날짜에 예정된 경기가 없습니다."),
  ).toBeVisible();

  await page.getByRole("button", { name: "나의 예측" }).click();
  await expect(
    page.getByRole("heading", { name: "로그인이 필요합니다" }),
  ).toBeVisible();
});
