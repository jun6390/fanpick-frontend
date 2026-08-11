# FanPick

스포츠 경기 일정 및 승부예측 커뮤니티 웹 서비스

---

## Live Demo

[FanPick 바로가기](https://fanpick-fe.vercel.app/)

---

## Introduction

**FanPick**은 사용자가 야구, 축구, e스포츠 경기 일정을 확인하고  
승부예측, 팀 기록 조회, 커뮤니티 활동을 함께 사용할 수 있는 스포츠 팬 웹 서비스입니다.

사용자의 관심 팀, 경기 일정, 예측 데이터를 기반으로  
경기 전후의 팬 경험을 한 곳에서 제공하는 것을 목표로 합니다.

---

## Development Period

2026.07.16 ~ 2026.07.30  
2주간 진행한 미니 프로젝트입니다.

---

## Team

<table>
  <tr>
    <td align="center" width="180px">
      <a href="https://github.com/jun6390">
        <img src="https://github.com/jun6390.png" width="120px;" alt="박해준"/>
        <br />
        <sub><b>박해준</b></sub>
      </a>
      <br />
      <b>FE</b>
    </td>
    <td align="center" width="180px">
      <a href="https://github.com/kimspace00">
        <img src="https://github.com/kimspace00.png" width="120px;" alt="김우주"/>
        <br />
        <sub><b>김우주</b></sub>
      </a>
      <br />
      <b>FE</b>
    </td>
    <td align="center" width="180px">
      <a href="https://github.com/namuleaf">
        <img src="https://github.com/namuleaf.png" width="120px;" alt="정승민"/>
        <br />
        <sub><b>정승민</b></sub>
      </a>
      <br />
      <b>FE</b>
    </td>
  </tr>
</table>

---

## Tech Stack

<table>
  <tr>
    <th width="120px">Frontend</th>
    <td>
      <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
      <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
      <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
      <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
    </td>
  </tr>
  <tr>
    <th width="120px">Backend</th>
    <td>
      <img src="https://img.shields.io/badge/Supabase%20Edge%20Functions-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white"/>
    </td>
  </tr>
  <tr>
    <th width="120px">Database</th>
    <td>
      <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white"/>
    </td>
  </tr>
  <tr>
    <th width="120px">API</th>
    <td>
      <img src="https://img.shields.io/badge/KBO%20Schedule-071A33?style=for-the-badge"/>
      <img src="https://img.shields.io/badge/K%20League%20Schedule-E31B36?style=for-the-badge"/>
      <img src="https://img.shields.io/badge/PandaScore-FF6B6B?style=for-the-badge"/>
      <img src="https://img.shields.io/badge/OpenAI%20API-412991?style=for-the-badge&logo=openai&logoColor=white"/>
    </td>
  </tr>
  <tr>
    <th width="120px">Library</th>
    <td>
      <img src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"/>
      <img src="https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/>
      <img src="https://img.shields.io/badge/React%20Icons-E91E63?style=for-the-badge&logo=react&logoColor=white"/>
    </td>
  </tr>
  <tr>
    <th width="120px">Deploy</th>
    <td>
      <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
      <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white"/>
    </td>
  </tr>
</table>

---

## Main Features

### 경기 일정 조회

KBO, K리그, LCK 경기 일정을 조회하고,  
경기 시간, 리그, 팀 정보, 경기 상태를 함께 제공합니다.

사용자는 종목별 경기 목록과 캘린더 화면을 통해  
관심 있는 경기 일정을 빠르게 확인할 수 있습니다.

### 승부예측

사용자가 경기 시작 전 홈팀 또는 원정팀을 선택하여  
승부예측에 참여할 수 있습니다.

예측 참여자 수와 팀별 예측 비율을 제공하고,  
경기 결과에 따라 예측 성공, 실패, 무승부 상태를 확인할 수 있습니다.

### AI 경기 리포트

종료된 경기 데이터를 기반으로 OpenAI API를 활용하여  
경기 요약과 주요 포인트를 생성합니다.

사용자는 최근 경기 결과를 텍스트 리포트 형태로 확인하고,  
팀 기록과 경기 흐름을 빠르게 파악할 수 있습니다.

### 커뮤니티 및 마이페이지

사용자의 승부예측 기록, 예측 뱃지, 관심 팀 정보를 기반으로  
개인화된 마이페이지를 제공합니다.

커뮤니티에서는 게시글 작성, 댓글, 랭킹, 예측 결과 공유를 통해  
팬들이 함께 의견을 나눌 수 있습니다.

---

## My Contribution

FanPick에서 경기 데이터가 사용자 기능으로 이어지는 흐름 중  
경기 데이터 수집/정규화, 승부예측 결과 정산, AI 경기 리포트 자동화, 커뮤니티 보안/성능 개선, 테스트와 CI 검증을 담당했습니다.

### 담당 기능

- Supabase Auth 기반 회원가입, 로그인, 비밀번호 재설정, 로그인 상태 Context, 보호 라우트 구성
- KBO, K리그, LCK 경기 일정 수집 스크립트와 GitHub Actions 자동 동기화 구축
- 외부 경기 데이터의 팀, 시간, 상태값을 서비스 화면에서 사용할 수 있도록 정규화하고 홈/경기 일정/팀 화면에 연동
- 승부예측 취소 권한 정책, 결과 동기화 스크립트, 예측 결과 정산 로직 개선
- 경기 시간, 종목별 예상 진행 시간, 점수 반영 시점을 기준으로 `scheduled`, `live`, `result_pending`, `finished` 상태 정규화
- Supabase Edge Function과 OpenAI API를 활용한 종료 경기 AI 리포트 생성, 재생성 스크립트, GitHub Actions 자동 실행 흐름 구현
- 커뮤니티 예측 랭킹 RPC와 랭킹 화면 구현, 통합 예측 배지 적용
- 커뮤니티 게시글 다중 이미지 업로드, 미리보기, 저장 실패 시 업로드 이미지 롤백 흐름 구현
- Supabase RLS와 Storage 정책으로 본인 게시글, 댓글, 반응, 이미지 파일만 수정/삭제 가능하도록 보안 강화
- 기존 커뮤니티 댓글/반응 UI와 중첩 답글 흐름 개선
- 커뮤니티 목록 서버 페이지네이션 RPC, React Query 캐싱, `useCommunityList` hook 분리
- 승부예측 통계 RPC 조회 범위를 화면에 표시할 경기 id로 제한하고, 예측 저장 직후 해당 경기 통계만 부분 갱신
- TeamRecord 기록 데이터 dynamic import, 기록 테이블 가상 스크롤, 반복 이미지 lazy loading 적용
- 홈 배너 responsive image, 마스코트 WebP/PNG 경량화 적용
- 공통 날짜/경기 상태/예측 결과 유틸 분리, Node.js 단위 테스트와 Playwright E2E/CI 검증 추가

---

## Troubleshooting

### 1. 경기 데이터 소스별 상태값 불일치

KBO, K리그, LCK 데이터 소스마다 경기 상태값과 점수 반영 시점이 달라 같은 화면에서도 경기 전, 진행 중, 종료 상태가 일관되지 않게 표시되는 문제가 있었습니다. 특히 경기 종료 직후 점수가 아직 반영되지 않았거나 야구 경기의 `0:0` 스코어가 임시 값으로 들어오는 경우, 승부예측 결과가 잘못 정산될 수 있었습니다.

이를 해결하기 위해 경기 날짜, 경기 시간, 종목별 예상 진행 시간, 점수 유무를 함께 판단하는 `normalizeMatchTimingStatus` 유틸을 구현했습니다. 이 유틸을 통해 외부 데이터 상태값을 그대로 사용하지 않고 `scheduled`, `live`, `result_pending`, `finished`로 변환해 예측 마감, 경기 카드 표시, 결과 정산 흐름을 일관되게 처리했습니다.

### 2. 승부예측 결과 정산 타이밍 문제

예측 결과를 DB에 저장된 `result` 값만 기준으로 표시하면 경기 결과 업데이트 타이밍에 따라 `pending` 상태가 오래 유지되거나, 실제 스코어와 화면 표시가 어긋나는 문제가 있었습니다. 무승부, 취소, 연기, 진행 중 경기처럼 단순 승패로 처리하면 안 되는 예외도 있었습니다.

이를 해결하기 위해 저장된 결과값, 경기 상태, 스코어, 사용자가 선택한 팀 코드를 함께 비교하는 `resolvePredictionResult` 로직을 분리했습니다. 이 로직은 `correct`, `incorrect`, `void`, `live`, `resultPending`, `cancelled` 상태를 계산해 경기 결과 반영 시점과 예외 케이스를 안정적으로 처리합니다.

### 3. 커뮤니티 이미지 업로드 롤백과 Storage 권한 문제

커뮤니티 게시글 작성 중 Storage 이미지 업로드는 성공했지만 DB 저장이 실패하면, 실제 게시글에서 사용되지 않는 이미지가 Storage에 남을 수 있었습니다. 또한 클라이언트에서 Supabase Storage를 직접 사용하기 때문에 사용자가 다른 사용자의 파일을 수정하거나 삭제하지 못하도록 DB 레벨 정책이 필요했습니다.

이미지 업로드 후 게시글 저장이 실패하면 업로드된 이미지 경로를 추적해 삭제하는 롤백 로직을 추가했습니다. 게시글 수정 시에는 유지할 이미지와 삭제할 이미지를 분리해 불필요한 파일이 남지 않도록 처리했습니다. 추가로 Supabase RLS와 Storage 정책을 적용해 `auth.uid()`와 사용자 ID가 일치하는 경우에만 게시글, 댓글, 반응, 이미지 파일을 수정/삭제할 수 있도록 제한했습니다.

### 4. 승부예측 통계 전체 조회로 인한 불필요한 응답 증가

홈, 경기 일정, 승부예측, 팀 상세, 마이페이지에서 경기별 참여자 수와 투표 비율이 필요했습니다. 처음에는 `get_match_prediction_stats` RPC가 모든 경기의 예측 통계를 반환했기 때문에, 특정 화면에서 10~20경기만 보여줘도 전체 경기 통계를 매번 내려받는 구조였습니다.

이를 해결하기 위해 RPC에 `target_match_ids` 파라미터를 추가하고, 각 화면에서 이미 로드한 경기 id만 넘기도록 변경했습니다. 예측 저장 직후에는 전체 목록을 다시 덮어쓰지 않고 해당 경기의 통계만 부분 갱신해 다른 경기의 투표율이 초기화되지 않도록 처리했습니다.

### 5. 커뮤니티 목록 전체 조회와 응원순 정렬 정확도 문제

커뮤니티 목록은 한 페이지에 10개만 보여주지만, 기존 구조에서는 게시글 전체를 가져온 뒤 클라이언트에서 검색, 필터, 페이지네이션을 처리했습니다. 1차 개선으로 서버 페이지네이션을 적용했지만, `응원순` 정렬은 현재 페이지에 포함된 게시글만 좋아요 수로 재정렬하는 한계가 있었습니다. 즉 전체 게시글 기준 좋아요순이 아니라, 이미 잘린 10개 안에서의 좋아요순이 될 수 있었습니다.

이를 해결하기 위해 Supabase RPC `get_community_post_page`를 추가했습니다. RPC에서 게시글 필터링, 검색, 댓글 수/응원 수 집계, 전체 개수 계산, 정렬, 페이지 범위 적용을 처리하고, 클라이언트는 반환된 게시글 id만 기준으로 실제 게시글 데이터를 조회합니다. 이 방식으로 `최신순`, `조회순`, `응원순` 모두 전체 게시글 기준 정렬과 페이지네이션이 일관되게 동작하도록 개선했습니다. 게시글 목록 로딩, 인기 게시글 조회, 실시간 변경 반영은 `useCommunityList` hook으로 분리해 페이지 컴포넌트의 책임도 줄였습니다.

### 6. 72px 마스코트 SVG가 1.4MB였던 문제

AI 리포트 패널과 푸시 알림 아이콘에 사용하는 `fanpick_mascot.svg`가 작은 SVG처럼 보였지만, 실제로는 72px SVG 내부에 1254px PNG가 base64로 포함되어 파일 크기가 `1,417.13KB`였습니다. 작은 아이콘 하나 때문에 불필요한 네트워크 비용이 발생할 수 있는 구조였습니다.

이를 해결하기 위해 원본에서 이미지를 추출하고 실제 사용 크기에 맞춰 UI용 WebP `3.00KB`, 알림용 PNG `33.23KB`, fallback SVG `0.73KB`로 분리했습니다. 홈 메인 배너도 AVIF/WebP responsive image로 변환해 1920px AVIF 기준 `269.92KB`에서 `76.33KB`로 줄였습니다.

### 7. React Query 전역 도입 시 초기 번들이 커질 수 있는 문제

Supabase 요청 캐싱을 위해 React Query를 도입했지만, 처음에는 앱 최상단에 `QueryClientProvider`를 두는 방식이었습니다. 이 경우 커뮤니티 목록에서만 필요한 React Query 코드가 홈 초기 entry에 섞일 수 있어, 성능 최적화 목적과 충돌할 수 있었습니다.

이를 해결하기 위해 `QueryClientProvider`를 커뮤니티 목록 라우트 내부로 제한했습니다. React Query 비용은 Community route chunk에만 반영되도록 하고, 초기 앱 entry는 gzip 기준 `127.15KB`에서 `127.09KB`로 거의 유지했습니다. 같은 커뮤니티 조건을 30초 staleTime 안에 재방문할 때는 Playwright E2E 기준 Supabase 목록 요청이 추가로 발생하지 않도록 검증했습니다.

### 8. Vercel 성능 측정 시 로그인 페이지가 측정된 문제

성능 최적화 전후 수치를 Vercel 배포 URL 기준으로 측정하려고 했지만, 처음에는 실제 앱이 아니라 Vercel 로그인 페이지가 Lighthouse 대상으로 잡히는 문제가 있었습니다. Deployment Protection이 켜진 generated deployment URL은 외부 접근 시 인증 화면으로 리다이렉트되기 때문에, 측정 결과가 앱 성능이 아니라 로그인 페이지 성능이 되어버렸습니다.

이를 해결하기 위해 Vercel 프로젝트의 Deployment Protection을 해제하고, Lighthouse 실행 전 `finalUrl`과 HTML 응답이 실제 앱인지 확인했습니다. 이후 개선 전/후 코드를 각각 Vercel generated production URL로 배포한 뒤 같은 Lighthouse desktop preset으로 다시 측정했습니다.

---

## Performance Optimization

### 성능 측정 요약

개선 전후 성능은 같은 Vite build 환경에서 `dist/assets` 산출물의 raw/gzip 크기를 비교하고, Supabase count 기준으로 DB 요청 범위 감소폭을 계산했습니다.

| 개선 항목                      |        개선 전 |      개선 후 |       성과 |
| ------------------------------ | -------------: | -----------: | ---------: |
| TeamRecord 기본 진입 JS gzip   |        32.99KB |      17.53KB | 46.9% 감소 |
| TeamRecord route shell JS gzip |        32.99KB |       6.17KB | 81.3% 감소 |
| MatchSchedule route JS gzip    |         4.28KB |       2.78KB | 35.2% 감소 |
| 홈 배너 1920px 이미지          |   269.92KB JPG | 76.33KB AVIF | 71.7% 감소 |
| UI 마스코트 이미지             | 1,417.13KB SVG |  3.00KB WebP | 99.8% 감소 |
| 승부예측 주간 통계 조회 범위   |        571경기 |       53경기 | 90.7% 감소 |
| 홈 오늘 경기 통계 조회 범위    |        571경기 |        7경기 | 98.8% 감소 |
| 커뮤니티 목록 조회 범위        |       381 rows | 최대 20 rows | 94.8% 감소 |
| 커뮤니티 같은 조건 재방문 요청 |            2건 |     추가 0건 |  100% 감소 |

Vercel generated production URL에서 Lighthouse desktop preset으로 측정한 결과입니다.

| 화면       | 지표              | 개선 전 | 개선 후 |       성과 |
| ---------- | ----------------- | ------: | ------: | ---------: |
| TeamRecord | Performance score |      94 |      98 |         +4 |
| TeamRecord | LCP               | 1,479ms |   920ms | 37.8% 감소 |
| Community  | Performance score |      90 |      94 |         +4 |
| Community  | LCP               | 1,873ms | 1,164ms | 37.8% 감소 |
| Community  | Speed Index       | 1,293ms | 1,214ms |  6.1% 감소 |

이 프로젝트의 핵심 성능 성과는 TeamRecord와 Community의 LCP 개선, DB/API 요청 범위 축소, 커뮤니티 query cache 재사용에 더 명확하게 나타났습니다.

### 1. 라우트 단위 코드 스플리팅

기능이 많아지면서 모든 페이지 코드를 초기 진입 시 한 번에 로드하면 번들 크기가 커질 수 있었습니다. `React.lazy`와 `Suspense`를 사용해 홈, 경기 일정, 승부예측, 커뮤니티, 캘린더, 마이페이지 등을 라우트 단위로 분리했습니다.

이를 통해 사용자가 접근한 페이지의 코드만 필요한 시점에 로드되도록 개선했습니다. 라우트 전환 중 빈 화면이 보이지 않도록 공통 로딩 fallback도 추가했습니다.

### 2. 이미지 포맷 및 로딩 최적화

홈 메인 배너는 JPG 하나만 내려받던 구조를 AVIF/WebP/JPG fallback을 가진 responsive `picture` 구조로 변경했습니다. 1920px 기준 이미지는 `269.92KB` JPG에서 `76.33KB` AVIF로 줄었고, 모바일에서는 960px AVIF `25.62KB`까지 줄어듭니다.

AI 리포트 패널에서 쓰는 마스코트는 1.4MB SVG를 3KB WebP로 대체했습니다. 홈 배너는 LCP 후보라 eager loading과 fetch priority를 유지하고, 팀 로고/프로필/게시글 썸네일/기록 이미지처럼 반복 렌더링되는 이미지는 `loading="lazy"`와 `decoding="async"`를 적용했습니다.

### 3. 오래된 캘린더 요청 취소

캘린더에서 월이나 필터를 빠르게 변경하면 이전 요청 응답이 늦게 도착해 최신 화면을 덮어쓸 수 있었습니다. `AbortController`를 사용해 이전 요청을 취소하고, 현재 선택된 월/필터에 대한 응답만 화면에 반영되도록 처리했습니다.

### 4. 커뮤니티 목록 데이터 병렬 조회

커뮤니티 목록에서는 게시글, 댓글 수, 반응 수가 함께 필요했습니다. 이를 순차 요청으로 처리하면 화면 로딩 시간이 길어질 수 있어 `Promise.all`로 병렬 조회한 뒤 클라이언트에서 댓글 수와 좋아요 수를 합산했습니다.

### 5. 커뮤니티 서버 페이지네이션

게시글 전체를 한 번에 내려받아 클라이언트에서 페이지를 자르던 구조를 현재 페이지 단위 조회로 변경했습니다. Supabase RPC에서 검색 조건과 카테고리 필터를 적용한 뒤 댓글 수, 응원 수, 전체 개수를 집계하고 정렬까지 처리합니다. 클라이언트는 반환된 게시글 id만 조회하므로 응답 범위가 줄고, `응원순`도 전체 게시글 기준으로 정확하게 정렬됩니다.

### 6. 커뮤니티 목록 React Query 캐싱

커뮤니티 목록은 검색어, 카테고리, 정렬, 페이지 조건이 자주 바뀌는 화면입니다. React Query를 커뮤니티 라우트 내부에만 적용하고, `category`, `page`, `searchKeyword`, `sortBy`, `userId`를 query key로 구성했습니다.

같은 조건을 30초 staleTime 안에 재방문하면 Supabase 목록 요청을 다시 보내지 않고 캐시 데이터를 재사용합니다. Playwright E2E에서는 `/community` 재방문 시 mock Supabase 목록 요청이 첫 방문 `2건`에서 추가 `0건`으로 유지되는 것을 검증했습니다.

### 7. 승부예측 통계 조회 범위 제한

경기별 참여자 수와 투표 비율 조회 RPC가 모든 경기 통계를 반환하던 구조를 개선해, 화면에 표시할 경기 id만 전달하도록 변경했습니다. 홈 핫매치는 후보 경기 id를 먼저 계산한 뒤 해당 후보들의 통계만 조회하고, 예측 저장 직후에는 변경된 경기만 부분 갱신합니다.

### 8. 기록 페이지 대용량 데이터 지연 로딩

팀/선수 기록 페이지는 KBO, K리그, LCK 정적 기록 데이터가 커서 초기 번들에 포함되면 첫 로딩 비용이 증가할 수 있었습니다. 종목별 기록 데이터를 dynamic import로 분리해 사용자가 해당 종목 탭에 접근할 때 필요한 데이터만 로드하도록 변경했습니다.

### 9. 기록 테이블 가상 스크롤

선수 기록 데이터가 늘어나면 테이블 row 전체를 한 번에 DOM에 렌더링하는 비용이 커질 수 있습니다. 기록 테이블에 고정 row 높이 기반 windowing을 적용해 row 수가 기준 이상일 때만 화면 주변 row와 spacer row를 렌더링하도록 변경했습니다.

현재 데이터에서는 필수 수준은 아니지만, 데이터가 늘어났을 때 DOM 노드 수 증가를 제한할 수 있고 TeamRecord Lighthouse LCP는 `1,479ms`에서 `920ms`로 개선되었습니다.

### 10. 로컬 시간 갱신과 서버 데이터 갱신 분리

승부예측 페이지는 경기 시작 시간과 투표 마감 상태를 실시간에 가깝게 보여줘야 했습니다. 하지만 매초 서버를 호출하면 불필요한 요청이 많아지기 때문에, 화면 시간 판단은 1초 단위로 로컬 갱신하고 경기/투표 통계 데이터는 1분 단위로 서버에서 다시 가져오도록 분리했습니다.

---

## Test Coverage

핵심 비즈니스 로직은 Node.js 내장 테스트 러너로 검증할 수 있도록 테스트를 추가했습니다.

- 예측 결과 계산: `test/predictionResult.test.js`
- 경기 상태 정규화: `test/matchStatus.test.js`
- 예측 변경 마감 시간: `test/predictionDeadline.test.js`
- 공통 날짜 유틸: `test/date.test.js`

```bash
npm run test
```

사용자 관점의 핵심 화면 흐름은 Playwright E2E 테스트로 검증합니다. Supabase REST/RPC 응답을 테스트에서 mock 처리해 외부 데이터 상태와 무관하게 홈, 커뮤니티 목록, 승부예측 화면의 기본 렌더링과 상호작용을 확인합니다.

- 홈 화면: 메인 배너, 경기 일정, 핫매치 섹션 렌더링
- 커뮤니티: `응원순` 정렬 버튼 클릭과 빈 목록 상태 확인
- 커뮤니티: 같은 조건 재방문 시 React Query 캐시로 Supabase 목록 요청 재사용 확인
- 승부예측: 비로그인 사용자가 `나의 예측` 탭 접근 시 로그인 안내 다이얼로그 확인

```bash
npm run test:e2e
```

GitHub Actions에서도 `npm run lint`, `npm run test`, `npm run build`, `npm run test:e2e:ci`가 PR/Push마다 실행되도록 CI를 추가했습니다.

관련 코드: `.github/workflows/ci.yml`, `playwright.config.js`, `e2e/smoke.spec.js`

---

## Architecture

FanPick은 프론트엔드를 **Vercel**, 백엔드와 데이터베이스를 **Supabase**에 구성했습니다.  
프론트엔드는 사용자와 직접 상호작용하며, Supabase API와 Edge Function을 통해 데이터를 처리합니다.  
GitHub Actions는 KBO, K리그, LCK 경기 일정과 기록 데이터를 동기화하고, AI 리포트와 알림 기능은 Supabase Edge Function을 통해 관리합니다.

<div align="center">
  <img src="./FanPick-SystemArchitecture.png" width="900" alt="FanPick System Architecture"/>
</div>

---

## UI Design

### Main Page

FanPick의 메인 화면은 스포츠 경기 정보를 빠르게 탐색할 수 있는 대시보드형 레이아웃으로 제작했습니다.  
상단에는 FanPick 브랜드 배너를 배치하고, 주요 경기와 인기 경기, 승부예측 진입 영역을 구성했습니다.  
사용자는 메인 화면에서 오늘의 경기, 핫 매치, 월드컵 콘텐츠 등 주요 기능으로 이동할 수 있습니다.  
각 섹션은 경기 정보와 팀 로고를 중심으로 구성하여 스포츠 팬이 원하는 정보를 직관적으로 확인할 수 있도록 했습니다.

<div align="center">
  <img src="./FanPick-Main.png" width="900" alt="FanPick Main Page"/>
</div>

<br />

---

## Deployment

| Part     | Platform |
| -------- | -------- |
| Frontend | Vercel   |
| Backend  | Supabase |
| Database | Supabase |

---

## Porting Manual

### 1. 실행 환경

- Node.js 22 이상
- npm
- Supabase 프로젝트
- Vercel 계정
- PandaScore API Key
- OpenAI API Key

### 2. 프로젝트 설치

```bash
git clone https://github.com/ureca-space/fanpick-frontend.git
cd fanpick-frontend
npm install
```

### 3. 환경 변수 설정

루트 경로에 `.env` 파일을 생성하고 아래 값을 설정합니다.

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_VAPID_PUBLIC_KEY=
```

경기 데이터 동기화와 AI 리포트 생성 스크립트를 실행하려면  
루트 경로에 `.env.sync` 파일을 추가로 생성합니다.

```bash
SUPABASE_URL=
SUPABASE_SERVER_KEY=
PANDASCORE_API_KEY=
REPORT_FUNCTION_SECRET=
```

AI 리포트 생성 범위를 직접 조정해야 하는 경우에만 아래 값을 선택적으로 추가합니다.  
설정하지 않으면 최근 3일, 최대 30경기를 기본값으로 사용합니다.

```bash
AI_REPORT_LOOKBACK_DAYS=
AI_REPORT_MAX_MATCHES=
```

실제 환경 변수 값은 GitHub에 올리지 않고, 로컬 `.env` 파일과 GitHub Actions Secrets, Vercel Environment Variables에서 관리합니다.

### 4. 로컬 실행

```bash
npm run dev
```

### 5. 빌드 확인

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

빌드 결과는 `dist` 폴더에 생성됩니다.

### 6. Supabase 설정

1. Supabase 프로젝트를 생성합니다.
2. `supabase/migrations`의 SQL을 적용하여 필요한 테이블과 정책을 구성합니다.
3. `supabase/manual`의 SQL은 운영자가 Supabase SQL Editor에서 직접 실행해야 하는 수동 설정 파일입니다.
4. `supabase/functions`의 Edge Function을 배포합니다.
5. Supabase Edge Function Secrets에 아래 값을 설정합니다.

```bash
OPENAI_API_KEY=
REPORT_FUNCTION_SECRET=
SUPABASE_URL=
SUPABASE_SECRET_KEYS=
```

AI 리포트 생성은 `generate-match-report` Edge Function에서 처리합니다.  
클라이언트는 OpenAI API를 직접 호출하지 않고, 생성된 리포트 데이터를 Supabase DB에서 조회합니다.

### 7. 데이터 동기화

경기 일정, 팀 기록, 순위, 예측 결과는 `scripts` 폴더의 스크립트로 동기화합니다.

```bash
npm run sync:schedules
npm run sync:standings
npm run sync:records
npm run sync:prediction-results
```

AI 리포트는 종료된 경기 중 아직 리포트가 없는 경기만 대상으로 생성합니다.

```bash
node --env-file=.env.sync scripts/generate-match-ai-reports.mjs
npm run reports:regenerate
```

### 8. GitHub Actions 설정

GitHub Actions에서 자동 동기화와 AI 리포트 생성을 사용하려면  
Repository Secrets에 아래 값을 등록합니다.

```bash
SUPABASE_URL
SUPABASE_SERVER_KEY
VITE_SUPABASE_PUBLISHABLE_KEY
PANDASCORE_API_KEY
REPORT_FUNCTION_SECRET
```

주요 워크플로우는 다음과 같습니다.

- `sync-kbo.yml`: KBO 경기 일정 동기화
- `sync-kleague.yml`: K리그 경기 일정 동기화
- `sync-lck.yml`: LCK 경기 일정 동기화
- `sync-records.yml`: 팀 기록 및 순위 동기화
- `sync-prediction-results.yml`: 승부예측 결과 정산
- `generate-match-ai-reports.yml`: 종료 경기 AI 리포트 생성

### 9. Vercel 배포

Vercel에서 GitHub 저장소를 연결한 뒤 아래 설정을 사용합니다.

| 항목             | 값              |
| ---------------- | --------------- |
| Framework Preset | Vite            |
| Build Command    | `npm run build` |
| Output Directory | `dist`          |

Vercel Environment Variables에는 아래 값을 등록합니다.

```bash
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_VAPID_PUBLIC_KEY
```

---

## Folder Structure

<pre>
FANPICK-FE
├── .github
│   └── workflows
├── docs
│   └── README Images
├── e2e
│   ├── support
│   └── smoke.spec.js
├── public
│   ├── logos
│   ├── fanpick_logo.svg
│   ├── fanpick_mascot.svg
│   ├── fanpick_mascot.webp
│   ├── fanpick_mascot-192.png
│   └── sw.js
├── scripts
│   ├── sync-kbo-schedule.mjs
│   ├── sync-kleague-schedule.mjs
│   ├── sync-lck-schedule.mjs
│   ├── generate-match-ai-reports.mjs
│   └── regenerate-all-match-ai-reports.mjs
├── src
│   ├── assets
│   │   └── images
│   ├── components
│   ├── constants
│   ├── contexts
│   ├── lib
│   ├── layouts
│   ├── pages
│   │   ├── Calendar
│   │   ├── Community
│   │   ├── Home
│   │   ├── MatchSchedule
│   │   ├── MyPage
│   │   ├── Prediction
│   │   ├── TeamRecord
│   │   ├── Teams
│   │   └── WorldCup
│   ├── routes
│   ├── services
│   ├── utils
│   ├── App.jsx
│   └── main.jsx
├── supabase
│   ├── functions
│   ├── manual
│   └── migrations
├── test
│   ├── date.test.js
│   ├── matchStatus.test.js
│   ├── predictionDeadline.test.js
│   └── predictionResult.test.js
├── index.html
├── package.json
├── playwright.config.js
├── vite.config.js
└── README.md
</pre>

---

## Project Summary

FanPick은 단순한 경기 일정 조회 서비스를 넘어  
승부예측, 팀 기록, AI 리포트, 경기 알림, 커뮤니티 기능을 함께 제공하는 스포츠 팬 서비스입니다.

프론트엔드는 React와 Vite 기반으로 구현했으며,  
백엔드와 데이터베이스는 Supabase를 사용하여 인증, 데이터 저장, Edge Function 기능을 구성했습니다.  
서비스는 Vercel과 Supabase를 통해 배포하여 실제 웹 환경에서 사용할 수 있도록 구성했습니다.
