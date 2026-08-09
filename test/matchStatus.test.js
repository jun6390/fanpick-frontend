import test from "node:test";
import assert from "node:assert/strict";
import {
  createMatchDateTime,
  normalizeMatchTimingStatus,
  parseMatchScore,
} from "../src/utils/matchStatus.js";

test("createMatchDateTime parses KST match timestamps", () => {
  assert.equal(
    createMatchDateTime("2026-07-30", "18:30"),
    Date.parse("2026-07-30T18:30:00+09:00"),
  );
});

test("parseMatchScore returns nullable away and home scores", () => {
  assert.deepEqual(parseMatchScore("2:4"), {
    awayScore: 2,
    homeScore: 4,
  });

  assert.deepEqual(parseMatchScore("bad-score"), {
    awayScore: null,
    homeScore: null,
  });
});

test("normalizeMatchTimingStatus keeps future matches scheduled", () => {
  const result = normalizeMatchTimingStatus(
    {
      matchDate: "2026-07-30",
      matchTime: "18:30",
      score: "1:0",
      sport: "baseball",
      status: "finished",
    },
    Date.parse("2026-07-30T09:00:00+09:00"),
  );

  assert.deepEqual(result, {
    score: null,
    status: "scheduled",
  });
});

test("normalizeMatchTimingStatus infers live state inside sport live window", () => {
  const result = normalizeMatchTimingStatus(
    {
      matchDate: "2026-07-30",
      matchTime: "18:30",
      score: null,
      sport: "soccer",
      status: "scheduled",
    },
    Date.parse("2026-07-30T19:00:00+09:00"),
  );

  assert.deepEqual(result, {
    score: null,
    status: "live",
  });
});

test("normalizeMatchTimingStatus protects newly finished unsettled baseball games", () => {
  const result = normalizeMatchTimingStatus(
    {
      matchDate: "2026-07-30",
      matchTime: "18:30",
      score: "0:0",
      sport: "baseball",
      status: "finished",
    },
    Date.parse("2026-07-30T19:00:00+09:00"),
  );

  assert.deepEqual(result, {
    score: null,
    status: "result_pending",
  });
});

test("normalizeMatchTimingStatus keeps settled finished games after protection window", () => {
  const result = normalizeMatchTimingStatus(
    {
      matchDate: "2026-07-30",
      matchTime: "18:30",
      score: "2:4",
      sport: "baseball",
      status: "finished",
    },
    Date.parse("2026-07-31T00:30:00+09:00"),
  );

  assert.deepEqual(result, {
    score: "2:4",
    status: "finished",
  });
});
