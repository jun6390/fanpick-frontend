import { useEffect, useState } from "react";
import {
  fetchPlayerRecords,
  fetchTeamRecords,
  subscribeTeamRecords,
} from "../../../services/teamRecords";

export const EMPTY_RECORD_DATA = {
  BASEBALL_HITTER_RECORDS: [],
  BASEBALL_HITTER_RECORDS_EXTRA: [],
  BASEBALL_PITCHER_RECORDS: [],
  BASEBALL_PITCHER_RECORDS_EXTRA: [],
  BASEBALL_TEAM_RECORDS: [],
  BASEBALL_TEAM_RECORDS_EXTRA: [],
  LOL_PLAYER_RECORDS: [],
  LOL_TEAM_RECORDS: [],
  SOCCER_PLAYER_RECORDS_K1: [],
  SOCCER_PLAYER_RECORDS_K2: [],
  SOCCER_TEAM_RECORDS_K1: [],
  SOCCER_TEAM_RECORDS_K2: [],
};

const recordDataCache = new Map();

const recordDataLoaders = {
  baseball: async () => import("../data/kboRecordData"),
  esports: async () => {
    const [teamRecords, playerRecords] = await Promise.all([
      import("../data/lolTeamRecordData"),
      import("../data/lolPlayerRecordData"),
    ]);

    return {
      LOL_PLAYER_RECORDS: playerRecords.LOL_PLAYER_RECORDS,
      LOL_TEAM_RECORDS: teamRecords.LOL_TEAM_RECORDS,
    };
  },
  soccer: async () => import("../data/kleagueRecordData"),
};

const loadRecordData = async (sport) => {
  if (!recordDataCache.has(sport)) {
    recordDataCache.set(
      sport,
      recordDataLoaders[sport]().then((data) => ({
        ...EMPTY_RECORD_DATA,
        ...data,
      })),
    );
  }

  return recordDataCache.get(sport);
};

const useTeamRecordData = ({
  activeLeagueId,
  activeSport,
  activeView,
  recordDatasetKey,
}) => {
  const [remoteRowsByKey, setRemoteRowsByKey] = useState({});
  const [recordDataBySport, setRecordDataBySport] = useState({});

  useEffect(() => {
    if (recordDataBySport[activeSport]) {
      return undefined;
    }

    let isMounted = true;

    loadRecordData(activeSport)
      .then((recordData) => {
        if (!isMounted) {
          return;
        }

        setRecordDataBySport((currentDataBySport) => ({
          ...currentDataBySport,
          [activeSport]: recordData,
        }));
      })
      .catch((error) => {
        console.warn("로컬 레코드 데이터 로드에 실패했습니다.", error);
      });

    return () => {
      isMounted = false;
    };
  }, [activeSport, recordDataBySport]);

  useEffect(() => {
    let isMounted = true;

    const fetchRemoteRows = async () => {
      try {
        const fetchRecords =
          activeView === "team" ? fetchTeamRecords : fetchPlayerRecords;
        const rows = await fetchRecords({
          leagueId: activeLeagueId,
          sportId: activeSport,
        });

        if (!isMounted) {
          return;
        }

        setRemoteRowsByKey((currentRowsByKey) => ({
          ...currentRowsByKey,
          [recordDatasetKey]: rows,
        }));
      } catch (error) {
        console.warn("레코드 조회 중 Supabase 요청이 실패했습니다.", error);
      }
    };

    fetchRemoteRows();
    const unsubscribe = subscribeTeamRecords(fetchRemoteRows);

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [activeLeagueId, activeSport, activeView, recordDatasetKey]);

  return {
    activeRecordData: recordDataBySport[activeSport] ?? EMPTY_RECORD_DATA,
    remoteRows: remoteRowsByKey[recordDatasetKey],
  };
};

export default useTeamRecordData;
