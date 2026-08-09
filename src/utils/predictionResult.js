import {
  isLiveMatchStatus,
  isResultPendingMatchStatus,
} from "./matchStatus.js";

export const SETTLED_PREDICTION_RESULTS = new Set(["correct", "incorrect"]);

const normalizeTeamCode = (teamCode) => teamCode?.trim().toUpperCase() ?? "";

const parsePredictionScore = (score) => {
  if (!score) {
    return {
      awayScore: null,
      homeScore: null,
    };
  }

  const [awayScore, homeScore] = String(score).split(":").map(Number);

  return {
    awayScore: Number.isFinite(awayScore) ? awayScore : null,
    homeScore: Number.isFinite(homeScore) ? homeScore : null,
  };
};

export const hasResolvedPredictionScore = (match) => {
  const { awayScore, homeScore } = parsePredictionScore(match?.score);

  if (awayScore === null || homeScore === null) {
    return false;
  }

  if (isLiveMatchStatus(match?.status)) {
    return false;
  }

  return match?.status === "finished";
};

export const resolvePredictionResult = (prediction) => {
  const storedResult = prediction?.result ?? "pending";
  const match = prediction?.matches;

  if (["cancelled", "postponed"].includes(match?.status)) {
    return "cancelled";
  }

  if (isLiveMatchStatus(match?.status)) {
    return "live";
  }

  if (isResultPendingMatchStatus(match?.status)) {
    return "resultPending";
  }

  if (!hasResolvedPredictionScore(match)) {
    return !match && SETTLED_PREDICTION_RESULTS.has(storedResult)
      ? storedResult
      : "pending";
  }

  const { awayScore, homeScore } = parsePredictionScore(match?.score);

  if (homeScore === awayScore) {
    return "void";
  }

  const selectedTeamCode = normalizeTeamCode(prediction?.selected_team_code);
  const winnerTeamCode =
    homeScore > awayScore
      ? normalizeTeamCode(match?.home_team_code)
      : normalizeTeamCode(match?.away_team_code);

  return selectedTeamCode && selectedTeamCode === winnerTeamCode
    ? "correct"
    : "incorrect";
};

export const isSettledPrediction = (prediction) =>
  SETTLED_PREDICTION_RESULTS.has(resolvePredictionResult(prediction));

export const createSettledPredictionSummary = (predictions) => {
  const settledPredictionResults = predictions
    .map(resolvePredictionResult)
    .filter((result) => SETTLED_PREDICTION_RESULTS.has(result));
  const correct = settledPredictionResults.filter(
    (result) => result === "correct",
  ).length;
  const incorrect = settledPredictionResults.filter(
    (result) => result === "incorrect",
  ).length;
  const total = correct + incorrect;

  return {
    total,
    correct,
    incorrect,
    accuracy: total ? Math.round((correct / total) * 100) : 0,
  };
};

export const createSettledPredictionSportStats = (predictions, sports) =>
  sports.map((sport) => {
    const summary = createSettledPredictionSummary(
      predictions.filter((prediction) => prediction.matches?.sport === sport),
    );

    return {
      sport,
      total_count: summary.total,
      correct_count: summary.correct,
      incorrect_count: summary.incorrect,
      accuracy_rate: summary.accuracy,
    };
  });
