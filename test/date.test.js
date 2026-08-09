import test from "node:test";
import assert from "node:assert/strict";
import {
  addDays,
  createToday,
  formatDateKey,
  formatDateRange,
  formatDotDate,
  formatMonthDay,
  getMonday,
  getMonthRange,
  parseDateKey,
} from "../src/utils/date.js";

test("formatDateKey and parseDateKey round-trip calendar dates at noon", () => {
  const date = parseDateKey("2026-07-30");

  assert.equal(date.getFullYear(), 2026);
  assert.equal(date.getMonth(), 6);
  assert.equal(date.getDate(), 30);
  assert.equal(date.getHours(), 12);
  assert.equal(formatDateKey(date), "2026-07-30");
});

test("date display helpers format dot and month-day labels", () => {
  const date = new Date(2026, 6, 3, 12);

  assert.equal(formatDotDate(date), "2026.07.03");
  assert.equal(formatMonthDay(date), "07.03");
});

test("addDays and getMonday keep week selection stable", () => {
  const wednesday = parseDateKey("2026-07-29");

  assert.equal(formatDateKey(addDays(wednesday, 2)), "2026-07-31");
  assert.equal(formatDateKey(getMonday(wednesday)), "2026-07-27");
  assert.equal(formatDateKey(getMonday(parseDateKey("2026-08-02"))), "2026-07-27");
});

test("getMonthRange returns first and last date of the selected month", () => {
  assert.deepEqual(getMonthRange(new Date(2026, 1, 12)), {
    fromDate: "2026-02-01",
    toDate: "2026-02-28",
  });
});

test("formatDateRange formats week date selector labels", () => {
  assert.equal(
    formatDateRange([parseDateKey("2026-07-27"), parseDateKey("2026-08-02")]),
    "2026.07.27 - 2026.08.02",
  );
});

test("createToday normalizes the current date to noon", () => {
  const today = createToday();

  assert.equal(today.getHours(), 12);
  assert.equal(today.getMinutes(), 0);
  assert.equal(today.getSeconds(), 0);
});
