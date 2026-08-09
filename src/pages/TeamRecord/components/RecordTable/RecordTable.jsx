import { useMemo, useState } from "react";
import styles from "./RecordTable.module.css";

const VIRTUAL_ROW_HEIGHT = 76;
const VIRTUAL_VISIBLE_ROWS = 12;
const VIRTUAL_OVERSCAN = 6;
const VIRTUAL_THRESHOLD = 40;

const RecordTable = ({
  columns,
  rows,
  getRowKey,
  ariaLabel,
  virtualized = false,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const shouldVirtualize = virtualized && rows.length > VIRTUAL_THRESHOLD;
  const viewportHeight = VIRTUAL_ROW_HEIGHT * VIRTUAL_VISIBLE_ROWS;
  const rawStartIndex = Math.max(
    0,
    Math.floor(scrollTop / VIRTUAL_ROW_HEIGHT) - VIRTUAL_OVERSCAN,
  );
  const startIndex = shouldVirtualize
    ? Math.min(Math.max(0, rows.length - 1), rawStartIndex)
    : 0;
  const endIndex = shouldVirtualize
    ? Math.min(
        rows.length,
        Math.ceil((scrollTop + viewportHeight) / VIRTUAL_ROW_HEIGHT) +
          VIRTUAL_OVERSCAN,
      )
    : rows.length;
  const visibleRows = useMemo(
    () => rows.slice(startIndex, endIndex),
    [endIndex, rows, startIndex],
  );
  const topSpacerHeight = shouldVirtualize ? startIndex * VIRTUAL_ROW_HEIGHT : 0;
  const bottomSpacerHeight = shouldVirtualize
    ? Math.max(0, (rows.length - endIndex) * VIRTUAL_ROW_HEIGHT)
    : 0;

  return (
    <div
      className={`${styles.tableShell} ${
        shouldVirtualize ? styles.virtualTableShell : ""
      }`}
      onScroll={
        shouldVirtualize
          ? (event) => setScrollTop(event.currentTarget.scrollTop)
          : undefined
      }
      style={
        shouldVirtualize
          ? { "--record-table-max-height": `${viewportHeight}px` }
          : undefined
      }
    >
      <table className={styles.table} aria-label={ariaLabel}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`${styles.headerCell} ${
                  column.align ? styles[`align${column.align}`] : ""
                }`}
                scope="col"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {topSpacerHeight > 0 && (
            <tr aria-hidden="true">
              <td
                className={styles.spacerCell}
                colSpan={columns.length}
                style={{ height: `${topSpacerHeight}px` }}
              />
            </tr>
          )}

          {visibleRows.map((row) => (
            <tr
              key={getRowKey(row)}
              className={styles.row}
              style={
                shouldVirtualize
                  ? { height: `${VIRTUAL_ROW_HEIGHT}px` }
                  : undefined
              }
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`${styles.bodyCell} ${
                    column.align ? styles[`align${column.align}`] : ""
                  }`}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}

          {bottomSpacerHeight > 0 && (
            <tr aria-hidden="true">
              <td
                className={styles.spacerCell}
                colSpan={columns.length}
                style={{ height: `${bottomSpacerHeight}px` }}
              />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecordTable;
