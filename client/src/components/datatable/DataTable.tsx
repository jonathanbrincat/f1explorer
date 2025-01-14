import React, { useState, BaseSyntheticEvent, useEffect } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import { DataTableRow } from "./DataTableRow";
import { DataTablePagination } from "./DataTablePagination";

export type HeaderType = {
  label: string;
  match: string;
};

interface TableProps {
  rows: any[];
  headers: HeaderType[];
  size: number;
  rowsPerPage: number;
  offset: number;
  handleDataSizeChange: (size: number) => void;
  handleDataOffsetChange: (page: number) => void;
  handleSort: (sortId: string, sortOrder: SortDirections) => void;
}

export enum SortDirections {
  ASC = "asc",
  DESC = "desc",
}

export const DataTable: React.FC<TableProps> = ({
  rows,
  headers,
  size,
  rowsPerPage,
  offset,
  handleDataOffsetChange,
  handleDataSizeChange,
  handleSort,
}) => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<SortDirections | undefined>(
    SortDirections.ASC
  );
  const [orderBy, setOrderBy] = useState<string | null>(null);

  const handleChangePage = (evt: MouseEvent, newPage: number) => {
    setPage(newPage);
    handleDataOffsetChange(newPage);
  };

  const handleChangeRowsPerPage = (evt: BaseSyntheticEvent) => {
    setPage(0);
    handleDataSizeChange(parseInt(evt.target.value, 10));
  };

  const handleChangeSort = (sortId: string) => {
    let overrideOrder: SortDirections = SortDirections.ASC;

    if (sortId === orderBy) {
      if (order === SortDirections.ASC) {
        overrideOrder = SortDirections.DESC;
      } else {
        overrideOrder = SortDirections.ASC;
      }
    }

    setOrderBy(sortId);
    setOrder(overrideOrder);
    handleSort(sortId, overrideOrder);
  };

  const renderTableHeader = () => {
    return (
      <TableHead>
        <TableRow>
          {headers.map((header, i) => {
            return (
              <TableCell
                style={{ width: `${100 / headers.length}%` }}
                key={`datatable-header-${i}`}
              >
                <TableSortLabel
                  active={orderBy === header.match}
                  direction={order}
                  onClick={() => {
                    handleChangeSort(header.match);
                  }}
                >
                  {header.label}
                  {orderBy === header.match ? (
                    <span style={{ display: "none" }}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  };

  const renderTableRows = () => {
    return rows.map((row, i) => {
      return (
        <DataTableRow key={`datatable-row-${i}`} headers={headers} row={row} />
      );
    });
  };

  const renderPagination = () => {
    return (
      <DataTablePagination
        page={page}
        colSpan={headers.length}
        rowsPerPage={rowsPerPage}
        size={size}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    );
  };

  if (!rows || rows.length < 1) {
    return <p>No results</p>;
  }

  return (
    <>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>{renderPagination()}</tr>
        </tbody>
      </table>
      <Table size="small" stickyHeader>
        {renderTableHeader()}
        <TableBody>{renderTableRows()}</TableBody>
        <TableFooter>
          <TableRow>{renderPagination()}</TableRow>
        </TableFooter>
      </Table>
    </>
  );
};
