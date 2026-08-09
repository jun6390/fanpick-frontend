import test from "node:test";
import assert from "node:assert/strict";
import {
  createSettledPredictionSummary,
  resolvePredictionResult,
} from "../src/utils/predictionResult.js";

const createPrediction = ({
  awayCode = "AWAY",
  homeCode = "HOME",
  result = "pending",
  score,
  selectedTeamCode,
  status = "finished",
} = {}) => ({
  result,
  selected_team_code: selectedTeamCode,
  matches: {
    away_team_code: awayCode,
    home_team_code: homeCode,
    score,
    status,
  },
});

test("resolvePredictionResult returns correct when selected team wins", () => {
  const prediction = createPrediction({
    score: "2:4",
    selectedTeamCode: "HOME",
  });

  assert.equal(resolvePredictionResult(prediction), "correct");
});

test("resolvePredictionResult returns incorrect when selected team loses", () => {
  const prediction = createPrediction({
    score: "5:2",
    selectedTeamCode: "HOME",
  });

  assert.equal(resolvePredictionResult(prediction), "incorrect");
});

test("resolvePredictionResult treats tied finished games as void", () => {
  const prediction = createPrediction({
    score: "3:3",
    selectedTeamCode: "HOME",
  });

  assert.equal(resolvePredictionResult(prediction), "void");
});

test("resolvePredictionResult preserves live and result-pending states", () => {
  assert.equal(
    resolvePredictionResult(
      createPrediction({
        score: "1:0",
        selectedTeamCode: "AWAY",
        status: "live",
      }),
    ),
    "live",
  );

  assert.equal(
    resolvePredictionResult(
      createPrediction({
        score: null,
        selectedTeamCode: "AWAY",
        status: "result_pending",
      }),
    ),
    "resultPending",
  );
});

test("resolvePredictionResult handles cancelled games and stored settled rows", () => {
  assert.equal(
    resolvePredictionResult(
      createPrediction({
        selectedTeamCode: "AWAY",
        status: "cancelled",
      }),
    ),
    "cancelled",
  );

  assert.equal(
    resolvePredictionResult({
      result: "correct",
      selected_team_code: "AWAY",
      matches: null,
    }),
    "correct",
  );
});

test("createSettledPredictionSummary only counts correct and incorrect results", () => {
  const summary = createSettledPredictionSummary([
    createPrediction({ score: "2:4", selectedTeamCode: "HOME" }),
    createPrediction({ score: "5:2", selectedTeamCode: "HOME" }),
    createPrediction({ score: "3:3", selectedTeamCode: "HOME" }),
    createPrediction({ score: null, selectedTeamCode: "HOME", status: "live" }),
  ]);

  assert.deepEqual(summary, {
    total: 2,
    correct: 1,
    incorrect: 1,
    accuracy: 50,
  });
});
