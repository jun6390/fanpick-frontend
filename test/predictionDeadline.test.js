import test from "node:test";
import assert from "node:assert/strict";
import {
  canChangePredictionByBeginAt,
  createMatchBeginAt,
} from "../src/utils/predictionDeadline.js";

test("createMatchBeginAt creates a KST ISO-like match start time", () => {
  assert.equal(
    createMatchBeginAt("2026-07-30", "18:30:00"),
    "2026-07-30T18:30:00+09:00",
  );
});

test("canChangePredictionByBeginAt closes changes 30 minutes before kickoff", () => {
  const beginAt = "2026-07-30T18:30:00+09:00";

  assert.equal(
    canChangePredictionByBeginAt(
      beginAt,
      Date.parse("2026-07-30T17:59:59+09:00"),
    ),
    true,
  );
  assert.equal(
    canChangePredictionByBeginAt(
      beginAt,
      Date.parse("2026-07-30T18:00:00+09:00"),
    ),
    false,
  );
});
