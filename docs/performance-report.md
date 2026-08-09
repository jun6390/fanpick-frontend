# FanPick Performance Report

측정일: 2026-08-09  
기준 버전: `c53d87a`  
측정 환경: Node.js `v22.12.0`, Vite `8.1.4`, Playwright `1.62.1`, Lighthouse `13.4.1`

## 측정 방법

- 개선 전: 현재 작업 전 `HEAD`를 임시 폴더에 `git archive`로 복사한 뒤 `npm run build` 실행
- 개선 후: 현재 작업트리에서 `npm run build` 실행
- 번들 크기: `dist/assets` 산출물의 raw size와 Node.js `gzipSync` 기준 gzip size 비교
- DB 요청 범위: Supabase count 조회로 현재 운영 데이터 규모를 확인한 뒤, 변경 전후 조회 row 범위 비교
- Lighthouse: Vercel generated production URL을 public 상태로 열어둔 뒤 desktop preset 단일 실행 결과 비교
- 원본 Lighthouse 요약 JSON: `docs/lighthouse-vercel-results.json`

## Build Bundle

| 측정 대상 | 개선 전 raw | 개선 후 raw | 감소율 | 개선 전 gzip | 개선 후 gzip | 감소율 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Initial app entry JS | 444.55KB | 443.57KB | 0.2% | 127.15KB | 127.09KB | 0.0% |
| TeamRecord route shell JS | 154.80KB | 21.24KB | 86.3% | 32.99KB | 6.17KB | 81.3% |
| TeamRecord default esports view JS | 154.80KB | 54.29KB | 64.9% | 32.99KB | 17.53KB | 46.9% |
| MatchSchedule route JS | 10.60KB | 6.03KB | 43.1% | 4.28KB | 2.78KB | 35.2% |
| Home route JS | 18.71KB | 19.06KB | -1.9% | 6.39KB | 6.50KB | -1.8% |
| Prediction route JS | 18.72KB | 18.48KB | 1.3% | 6.68KB | 6.53KB | 2.1% |
| TeamDetail route JS | 24.56KB | 24.14KB | 1.7% | 7.87KB | 7.68KB | 2.4% |
| WeekDateSelector shared JS | 2.63KB | 2.44KB | 7.2% | 1.11KB | 1.04KB | 6.4% |
| predictionApi shared JS | 4.64KB | 3.83KB | 17.5% | 1.88KB | 1.65KB | 12.1% |
| Community route JS | 9.81KB | 43.19KB | -340.3% | 3.47KB | 13.17KB | -279.0% |

### 해석

- 초기 앱 엔트리 JS는 이미 라우트 단위 코드 스플리팅이 적용되어 있어 변화폭이 작았습니다.
- 가장 큰 개선은 TeamRecord 페이지입니다. KBO, K리그, LCK 기록 데이터를 페이지 청크에 한 번에 묶지 않고 종목별 dynamic import로 분리했습니다.
- TeamRecord의 전체 기록 데이터 총량은 거의 비슷하지만, 사용자가 처음 진입하는 기본 LOL 화면 기준으로 필요한 JS가 gzip 기준 `32.99KB`에서 `17.53KB`로 줄었습니다.
- MatchSchedule 페이지는 중복 팀 정보 객체를 제거하고 공통 `teamInfo`를 재사용해 route JS가 gzip 기준 `35.2%` 감소했습니다.
- Home route JS는 responsive image import가 추가되어 gzip 기준 `1.8%` 증가했습니다. 대신 실제 이미지 전송량은 AVIF/WebP 선택으로 크게 줄었습니다.
- Community route JS는 React Query를 커뮤니티 라우트 내부에만 도입하면서 gzip 기준 `3.47KB`에서 `13.17KB`로 증가했습니다. 초기 앱 entry로 번지지 않도록 전역 provider가 아니라 route-local provider로 제한했습니다.

## Image Assets

### 홈 메인 배너

| 자산 | 크기 | 원본 JPG 대비 |
| --- | ---: | ---: |
| 기존 `fanpick_banner.jpg` | 269.92KB | 기준 |
| `fanpick_banner-960.avif` | 25.62KB | 90.5% 감소 |
| `fanpick_banner-1440.avif` | 48.17KB | 82.2% 감소 |
| `fanpick_banner-1920.avif` | 76.33KB | 71.7% 감소 |
| `fanpick_banner-1920.webp` | 126.37KB | 53.2% 감소 |

변경 내용:

- 홈 배너를 `picture`로 렌더링해 AVIF, WebP, JPG fallback 순서로 제공했습니다.
- `srcset`과 `sizes="100vw"`를 적용해 viewport에 맞는 폭의 이미지를 선택하도록 했습니다.
- 홈 배너는 LCP 후보이므로 `loading="lazy"`를 적용하지 않고 `loading="eager"`와 `fetchPriority="high"`를 유지했습니다.

### FanPick 마스코트

| 자산 | 개선 전 | 개선 후 | 감소율 |
| --- | ---: | ---: | ---: |
| UI 마스코트 | 1,417.13KB SVG | 3.00KB WebP | 99.8% 감소 |
| 알림 아이콘 | 1,417.13KB SVG | 33.23KB PNG | 97.7% 감소 |
| SVG fallback | 1,417.13KB | 0.73KB | 99.9% 감소 |

기존 `fanpick_mascot.svg`는 72px SVG 안에 1254px PNG가 base64로 포함되어 있었습니다. UI에서는 WebP를 사용하고, Service Worker 알림에서는 PNG를 사용하도록 분리했습니다.

## DB/API Request Scope

측정 시점 Supabase 데이터 규모:

| 데이터 | 건수 |
| --- | ---: |
| 전체 경기 `matches` | 571 |
| 승부예측 주간 화면 경기 | 53 |
| 홈 오늘 경기 | 7 |
| 커뮤니티 게시글 | 86 |
| 커뮤니티 댓글 | 247 |
| 커뮤니티 좋아요 반응 | 48 |

### 승부예측 통계 RPC

| 화면 | 개선 전 | 개선 후 | 감소율 |
| --- | ---: | ---: | ---: |
| 승부예측 주간 화면 | 전체 경기 571건 통계 | 화면 경기 53건 통계 | 90.7% |
| 홈 오늘 경기 | 전체 경기 571건 통계 | 오늘 경기 7건 통계 | 98.8% |

변경 내용:

- 기존 `get_match_prediction_stats()`는 항상 전체 경기 통계를 반환했습니다.
- 개선 후 `get_match_prediction_stats(target_match_ids)`로 화면에서 필요한 경기 id만 넘깁니다.
- 예측 저장 직후에도 전체 목록 통계를 다시 덮어쓰지 않고 해당 경기 통계만 부분 갱신합니다.

관련 코드:

- `src/services/predictionApi.js`
- `src/pages/Prediction/PredictionPage.jsx`
- `src/pages/Home/components/HotMatchSection/HotMatchSection.jsx`
- `supabase/migrations/20260807000100_match_prediction_stats_filter.sql`

### 커뮤니티 목록

| 항목 | 개선 전 | 개선 후 | 감소율 |
| --- | ---: | ---: | ---: |
| 게시판 목록 데이터 범위 | 게시글 86 + 댓글 247 + 좋아요 48 = 381 rows | RPC page rows 10 + 게시글 상세 10 = 최대 20 rows | 94.8% |
| 같은 조건 재방문 요청 | Supabase 목록 요청 2건 재실행 | staleTime 30초 내 0건 | 100% 감소 |

변경 내용:

- 기존에는 한 페이지에 10개만 보여줘도 게시글, 댓글, 좋아요 데이터를 전체 조회한 뒤 클라이언트에서 페이지를 잘랐습니다.
- 1차 페이지네이션 후에도 `응원순`은 현재 페이지 안에서만 정렬되는 문제가 남아 있었습니다.
- 개선 후 `get_community_post_page` RPC가 필터, 검색, 댓글 수, 응원 수, 전체 개수, 정렬, 페이지 범위를 DB에서 처리합니다.
- 클라이언트는 RPC가 반환한 게시글 id만 다시 조회해 목록을 렌더링합니다.
- React Query를 커뮤니티 목록 라우트에만 도입해 `category`, `page`, `searchKeyword`, `sortBy`, `userId`를 query key로 캐싱합니다.
- Playwright E2E에서 같은 `/community` 조건을 30초 staleTime 안에 재방문할 때 mock Supabase 목록 요청이 `2건`에서 추가 `0건`으로 줄어드는 것을 검증했습니다.

관련 코드:

- `src/services/communityApi.js`
- `src/pages/Community/hooks/useCommunityList.js`
- `supabase/migrations/20260809000100_community_posts_page_rpc.sql`

## Vercel Lighthouse

측정 URL:

| 구분 | URL |
| --- | --- |
| 개선 전 | `https://fanpick-frontend-41mhvp309-hae-jun-s-projects.vercel.app` |
| 개선 후 | `https://fanpick-frontend-nngsavgvv-hae-jun-s-projects.vercel.app` |

측정 조건:

- Vercel generated production URL
- Lighthouse `13.4.1`
- Desktop preset
- 각 화면 단일 실행 기준

### Home

| 지표 | 개선 전 | 개선 후 | 변화 |
| --- | ---: | ---: | ---: |
| Performance score | 95 | 93 | -2 |
| FCP | 839ms | 1,048ms | 24.9% 증가 |
| LCP | 1,245ms | 1,297ms | 4.2% 증가 |
| TBT | 5ms | 43ms | 38ms 증가 |
| Speed Index | 1,394ms | 1,669ms | 19.8% 증가 |
| CLS | 0.000 | 0.000 | 유지 |

### TeamRecord

| 지표 | 개선 전 | 개선 후 | 변화 |
| --- | ---: | ---: | ---: |
| Performance score | 94 | 98 | +4 |
| FCP | 838ms | 837ms | 0.1% 감소 |
| LCP | 1,479ms | 920ms | 37.8% 감소 |
| TBT | 0ms | 56ms | 56ms 증가 |
| Speed Index | 1,182ms | 1,197ms | 1.3% 증가 |
| CLS | 0.004 | 0.006 | 0.002 증가 |

### Community

| 지표 | 개선 전 | 개선 후 | 변화 |
| --- | ---: | ---: | ---: |
| Performance score | 90 | 94 | +4 |
| FCP | 835ms | 828ms | 0.8% 감소 |
| LCP | 1,873ms | 1,164ms | 37.8% 감소 |
| TBT | 0ms | 130ms | 130ms 증가 |
| Speed Index | 1,293ms | 1,214ms | 6.1% 감소 |
| CLS | 0.001 | 0.001 | 유지 |

### 해석

- 홈 화면은 이미지 전송량은 줄었지만 Lighthouse 단일 실행에서는 score가 `95`에서 `93`으로 낮아졌습니다. LCP는 `1,245ms`에서 `1,297ms`로 `52ms` 증가해 사실상 큰 변화는 아니지만, 홈 최적화 성과로 주장하지 않는 것이 맞습니다.
- TeamRecord는 대용량 기록 데이터 dynamic import와 가상 스크롤 적용 후 LCP가 `1,479ms`에서 `920ms`로 `37.8%` 감소했고, Performance score는 `94`에서 `98`로 올랐습니다.
- Community는 서버 페이지네이션, React Query 캐싱, 이미지 lazy loading 적용 후 LCP가 `1,873ms`에서 `1,164ms`로 `37.8%` 감소했고, Performance score는 `90`에서 `94`로 올랐습니다.
- TeamRecord와 Community 모두 TBT는 증가했지만 각각 `56ms`, `130ms`로 Lighthouse Good 기준인 `200ms` 이내입니다.

## Troubleshooting Notes

### 페이지 단위 응원순 정렬 문제

서버 페이지네이션을 적용한 뒤에도 `응원순` 정렬은 완전하지 않았습니다. Supabase `range`로 최신순 10개를 먼저 가져온 뒤 클라이언트에서 그 10개만 좋아요 수로 정렬했기 때문입니다. 사용자는 전체 게시글 기준 응원순을 기대하지만 실제로는 현재 페이지 안에서만 순서가 바뀌는 문제가 있었습니다.

해결을 위해 RPC에서 댓글 수와 좋아요 수를 집계하고, 정렬과 페이지 범위 적용까지 DB에서 처리하도록 바꿨습니다. 이 방식으로 `최신순`, `조회순`, `응원순` 모두 같은 기준으로 전체 데이터 정렬 후 페이지네이션됩니다.

### 대용량 정적 기록 데이터 분리

TeamRecord 페이지는 기록 데이터가 많아 모든 종목 데이터를 같은 route chunk에 포함하면 사용자가 보지 않는 KBO/K리그 데이터까지 첫 진입에 내려받는 문제가 있었습니다. 단순히 파일을 나누는 것만으로는 번들러가 같은 청크에 묶을 수 있으므로, 종목별 `dynamic import`를 적용해 실제 접근 시점에만 로드되도록 분리했습니다.

### React Query 전역 도입으로 초기 번들이 커질 수 있는 문제

Supabase 요청 캐싱을 위해 React Query를 도입했지만, 처음에는 `main.jsx`에 전역 `QueryClientProvider`를 넣는 방식이었습니다. 이 경우 커뮤니티 목록에서만 필요한 React Query 코드가 초기 앱 entry에 포함될 수 있어 홈 첫 진입 성능과 충돌합니다.

해결을 위해 `QueryClientProvider`를 커뮤니티 목록 라우트 내부로 제한했습니다. 덕분에 React Query 비용은 Community route chunk에만 반영되고, 초기 앱 entry는 gzip 기준 `127.15KB`에서 `127.09KB`로 거의 유지되었습니다.

### 이미지 파일 자체가 잘못 컸던 문제

`fanpick_mascot.svg`는 72px SVG처럼 보였지만 내부에 1254px PNG가 base64로 들어 있어 실제 파일 크기가 `1,417.13KB`였습니다. 화면에서는 작은 아이콘으로만 쓰이기 때문에 이 크기는 불필요했습니다.

해결을 위해 원본에서 픽셀 이미지를 추출해 UI용 WebP `3.00KB`, 알림용 PNG `33.23KB`, fallback SVG `0.73KB`로 분리했습니다. 홈 배너는 AVIF/WebP responsive image로 변환해 1920px AVIF 기준 `269.92KB`에서 `76.33KB`로 줄였습니다.

### 측정 기준 분리

초기 앱 엔트리 크기는 이미 라우트 lazy loading 덕분에 큰 변화가 없었습니다. 따라서 성능 성과를 앱 전체 entry 하나로만 판단하지 않고, 사용자가 실제로 진입하는 route chunk와 DB/API 응답 범위를 별도로 측정했습니다.

### Vercel Deployment Protection으로 Lighthouse가 로그인 페이지를 측정한 문제

처음 Vercel generated URL로 Lighthouse를 실행했을 때 실제 앱이 아니라 Vercel 로그인 페이지가 측정되었습니다. Deployment Protection이 켜져 있으면 preview/generated URL 접근 시 인증 화면으로 리다이렉트되기 때문입니다.

해결을 위해 Vercel 프로젝트의 Deployment Protection을 해제한 뒤, 측정 전 `finalUrl`과 HTML 응답 길이를 확인했습니다. 이후 앱 HTML이 직접 반환되는 public generated production URL에서 Lighthouse를 다시 실행해 전후 수치를 확정했습니다.

### 홈 Lighthouse 수치가 기대와 다르게 개선되지 않은 문제

홈 배너의 이미지 전송량은 AVIF 기준 크게 줄었지만, 최종 Lighthouse 단일 실행에서는 Home score가 `95`에서 `93`으로 낮아졌습니다. 홈은 기존에도 LCP가 `1.2s` 수준으로 이미 빠른 상태였고, responsive image import로 route JS가 gzip 기준 `6.39KB`에서 `6.50KB`로 소폭 증가했습니다.

따라서 포트폴리오에서는 홈 Lighthouse를 주요 성과로 강조하지 않고, 이미지 byte 절감은 별도 자산 최적화 성과로 분리했습니다. 핵심 성능 성과는 TeamRecord와 Community의 LCP 개선, DB/API 요청 범위 축소, 같은 커뮤니티 query key 재방문 시 요청 재사용으로 설명하는 것이 더 정확합니다.

## 검증

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

검증 결과:

- ESLint 통과
- Node.js 단위 테스트 20개 통과
- Vite production build 통과
- Playwright E2E 4개 통과
