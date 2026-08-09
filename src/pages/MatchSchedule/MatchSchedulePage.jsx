import { useEffect, useMemo, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import EmptyState from "../../components/EmptyState/EmptyState";
import MatchCard from "../../components/MatchCard/MatchCard";
import MatchCardSkeleton from "../../components/MatchCard/MatchCardSkeleton";
import MatchFilter from "../../components/MatchFilter/MatchFilter";
import SearchInput from "../../components/SearchInput/SearchInput";
import SubNav from "../../components/SubNav/SubNav";
import WeekDateSelector from "../../components/WeekDateSelector/WeekDateSelector";
import { MATCH_CENTER_SUB_NAV_ITEMS } from "../../constants/matchCenterNav";
import { getTeamInfo } from "../../constants/teamInfo";
import useAuth from "../../contexts/useAuth";
import { supabase } from "../../lib/supabase";
import { subscribeToMatchChanges } from "../../services/matchRealtime";
import {
  applyPredictionStatsToMatches,
  fetchMatchPredictionStats,
  fetchMyPredictionSelections,
  markPredictedMatches,
} from "../../services/predictionApi";
import {
  DAY_LABELS_KO as DAY_LABELS,
  addDays,
  createToday,
  formatDateKey,
  formatMonthDay,
  getMonday,
  parseDateKey,
} from "../../utils/date";
import { normalizeMatchTimingStatus } from "../../utils/matchStatus";
import styles from "./MatchSchedulePage.module.css";

const FILTERS = [
  { id: "all", label: "ALL" },
  { id: "baseball", label: "BASEBALL" },
  { id: "soccer", label: "SOCCER" },
  { id: "esports", label: "LOL" },
];

const SUPPORTED_SPORT_IDS = new Set(
  FILTERS.filter((filter) => filter.id !== "all").map((filter) => filter.id),
);

const SPORT_LABELS = {
  baseball: "BASEBALL",
  soccer: "SOCCER",
  esports: "LOL",
};

const STADIUM_NAMES = {
  JAMSIL: "잠실 야구장",
  GOCHEOKSKY: "고척 스카이돔",
  SUWON: "수원 KT 위즈 파크",
  DAEGU: "대구 삼성 라이온즈 파크",
  SAJIK: "사직 야구장",
  CHANGWON: "창원 NC 파크",
  DAEJEON: "대전 한화생명 볼파크",
  GWANGJU: "광주-기아 챔피언스 필드",
  MUNHAK: "인천 SSG 랜더스필드",
  INCHEON: "인천 SSG 랜더스필드",
};

const getStadiumName = (stadium) => {
  const normalizedStadium = stadium?.trim().toUpperCase();

  return STADIUM_NAMES[normalizedStadium] ?? stadium ?? "경기장 미정";
};

const normalizeSupabaseMatch = (match) => {
  const matchDate = parseDateKey(match.match_date);
  const time = match.match_time?.slice(0, 5) ?? "미정";
  const timingStatus = normalizeMatchTimingStatus({
    matchDate: match.match_date,
    matchTime: time,
    score: match.score,
    sport: match.sport,
    status: match.status,
  });

  const homeTeam = getTeamInfo(match.home_team_code, match.sport);
  const awayTeam = getTeamInfo(match.away_team_code, match.sport);

  return {
    id: match.external_id ?? `match-${match.id}`,
    databaseId: match.id,
    dateKey: match.match_date,

    sport: match.sport,
    sportLabel: SPORT_LABELS[match.sport] ?? match.sport?.toUpperCase() ?? "",

    league: match.league,

    date: formatMonthDay(matchDate),

    day: DAY_LABELS[matchDate.getDay()],
    time,
    venue: getStadiumName(match.venue),

    homeTeam,
    awayTeam,

    homeVotes: 50,
    awayVotes: 50,

    status: timingStatus.status,
    score: timingStatus.score,
    gameType: match.game_type,
    broadcast: match.broadcast,
    note: match.note,
  };
};

const includesSearchKeyword = (match, searchKeyword) => {
  const normalizedKeyword = searchKeyword.trim().toLowerCase();

  if (!normalizedKeyword) {
    return true;
  }

  const searchableText = [
    match.sportLabel,
    match.league,
    match.venue,
    match.homeTeam.name,
    match.homeTeam.shortName,
    match.awayTeam.name,
    match.awayTeam.shortName,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchableText.includes(normalizedKeyword);
};

const MatchSchedulePage = () => {
  const { user } = useAuth();
  const userId = user?.id || "";

  const [matches, setMatches] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [weekStart, setWeekStart] = useState(() => getMonday(createToday()));

  const [selectedDate, setSelectedDate] = useState(() =>
    formatDateKey(createToday()),
  );

  useEffect(() => {
    let isMounted = true;

    const loadMatches = async ({ showLoading = true } = {}) => {
      try {
        if (showLoading) {
          setIsLoading(true);
          setLoadError("");
        }

        const { data, error } = await supabase
          .from("matches")
          .select(
            `
              id,
              external_id,
              sport,
              league,
              match_date,
              match_time,
              game_type,
              away_team_code,
              home_team_code,
              score,
              status,
              venue,
              broadcast,
              note
            `,
          )
          .order("match_date", {
            ascending: true,
          })
          .order("match_time", {
            ascending: true,
          });

        if (error) {
          throw error;
        }

        if (!isMounted) {
          return;
        }

        const normalizedMatches = (data ?? [])
          .filter(
            (match) =>
              SUPPORTED_SPORT_IDS.has(match.sport) &&
              match.match_date &&
              match.home_team_code &&
              match.away_team_code,
          )
          .map(normalizeSupabaseMatch);

        const [predictionStats, myPredictions] = await Promise.all([
          fetchMatchPredictionStats(
            normalizedMatches.map((match) => match.databaseId),
          ),
          userId
            ? fetchMyPredictionSelections(
                userId,
                normalizedMatches.map((match) => match.databaseId),
              ).catch((error) => {
                console.error("경기 일정 예측 여부 조회 실패", error);
                return [];
              })
            : Promise.resolve([]),
        ]);

        if (!isMounted) {
          return;
        }

        setMatches(
          markPredictedMatches(
            applyPredictionStatsToMatches(normalizedMatches, predictionStats),
            myPredictions,
          ),
        );
      } catch (error) {
        console.error("경기 일정 불러오기 실패", error);

        if (isMounted && showLoading) {
          setLoadError("경기 일정을 불러오지 못했습니다.");
        }
      } finally {
        if (isMounted && showLoading) {
          setIsLoading(false);
        }
      }
    };

    loadMatches();

    const unsubscribe = subscribeToMatchChanges({
      channelName: "match-schedule-matches",
      onChange: () => loadMatches({ showLoading: false }),
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [userId]);

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = addDays(weekStart, index);

      return {
        date,
        dateKey: formatDateKey(date),
        dayLabel: DAY_LABELS[date.getDay()],
      };
    });
  }, [weekStart]);

  const searchedMatches = useMemo(() => {
    return matches.filter((match) => {
      const isSameSport =
        activeFilter === "all" || match.sport === activeFilter;

      const isIncludedSearchKeyword = includesSearchKeyword(
        match,
        searchKeyword,
      );

      return isSameSport && isIncludedSearchKeyword;
    });
  }, [matches, activeFilter, searchKeyword]);

  const filteredMatches = useMemo(() => {
    return searchedMatches.filter((match) => match.dateKey === selectedDate);
  }, [searchedMatches, selectedDate]);

  const handleMoveWeek = (weekAmount) => {
    const nextWeekStart = addDays(weekStart, weekAmount * 7);

    setWeekStart(nextWeekStart);
    setSelectedDate(formatDateKey(nextWeekStart));
  };

  const handleMoveToCurrentWeek = () => {
    const today = createToday();

    setWeekStart(getMonday(today));
    setSelectedDate(formatDateKey(today));
  };

  const hasMatchOnDate = (dateKey) => {
    return searchedMatches.some((match) => match.dateKey === dateKey);
  };

  return (
    <>
      <SubNav
        ariaLabel="매치 센터 메뉴"
        items={MATCH_CENTER_SUB_NAV_ITEMS}
      />

      <section className={styles.schedulePage}>
        <div className="container">
          <header className={styles.pageHeader}>
            <p className={styles.eyebrow}>FANPICK MATCH CENTER</p>

            <h1 className={styles.title}>MATCH SCHEDULE</h1>

            <p className={styles.description}>
              주요 경기 일정을 확인하고 원하는 경기를 선택해 보세요.
            </p>
          </header>

          <div className={styles.controlArea}>
            <div className={styles.filterArea}>
              <MatchFilter
                filters={FILTERS}
                activeFilter={activeFilter}
                onChange={setActiveFilter}
              />
            </div>

            <div className={styles.searchArea}>
              <SearchInput
                value={searchKeyword}
                onChange={setSearchKeyword}
                placeholder="팀 이름을 검색해보세요"
                ariaLabel="경기 검색"
                debounceDelay={500}
              />
            </div>
          </div>

          <WeekDateSelector
            className={styles.schedulePanel}
            dates={weekDates}
            selectedDate={selectedDate}
            onMoveWeek={handleMoveWeek}
            onMoveToCurrentWeek={handleMoveToCurrentWeek}
            onSelectDate={setSelectedDate}
            hasItemOnDate={hasMatchOnDate}
          />

          <div className={styles.resultHeader}>
            <div>
              <p className={styles.resultDate}>
                {selectedDate.replaceAll("-", ".")}
              </p>

              <h2 className={styles.resultTitle}>MATCHES</h2>
            </div>

            <span className={styles.matchCount}>
              {filteredMatches.length} MATCHES
            </span>
          </div>

          {isLoading ? (
            <div className={styles.matchList} aria-label="경기 일정 로딩 중">
              {Array.from({ length: 8 }, (_, index) => (
                <MatchCardSkeleton key={index} />
              ))}
            </div>
          ) : loadError ? (
            <EmptyState
              icon={FiCalendar}
              title={loadError}
              description="Supabase 연결 상태와 조회 권한을 확인해 주세요."
            />
          ) : filteredMatches.length > 0 ? (
            <div className={styles.matchList}>
              {filteredMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FiCalendar}
              title={
                searchKeyword.trim()
                  ? "검색 조건에 맞는 경기가 없습니다."
                  : "예정된 경기가 없습니다."
              }
              description="다른 날짜, 종목 또는 검색어를 선택해 주세요."
            />
          )}
        </div>
      </section>
    </>
  );
};

export default MatchSchedulePage;
