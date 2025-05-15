import React, { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import './index.css';

import { Button } from 'react-bootstrap';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor(`id`, {
      enableSorting: true,
      header: `ID`,
    }),
    columnHelper.accessor(`catName`, {
      enableSorting: true,
      header: `Cat Name`,
    }),
    columnHelper.accessor(`catDateOfBirth`, {
      enableSorting: true,
      header: `Birth Date`,
    }),
    columnHelper.accessor(`instrumentType`, {
      enableSorting: true,
      header: `Instrument Type`,
    }),
    columnHelper.accessor(`score`, {
      enableSorting: true,
      header: `Score`,
    }),
    columnHelper.accessor(`riskLevel`, {
      enableSorting: true,
      header: `Risk Level`,
      sortingFn: (rowA, rowB, columnId) => {
        const orderRiskLevel = {
          High: 3,
          Medium: 2,
          // eslint-disable-next-line sort-keys
          Low: 1,
        };

        const a = orderRiskLevel[rowA.getValue(columnId)] ?? 0;
        const b = orderRiskLevel[rowB.getValue(columnId)] ?? 0;

        return a - b;

      },

    }),
    columnHelper.accessor(`createdAt`, {
      enableSorting: true,
      header: `Created On`,
      // eslint-disable-next-line sort-keys
      cell: info => {
        const value = info.getValue();
        return value ? new Date(value).toLocaleDateString() : ``;
      },
    }),
    columnHelper.accessor(`updatedAt`, {
      enableSorting: true,
      header: `Updated On`,
      // eslint-disable-next-line sort-keys
      cell: info => {
        const value = info.getValue();
        return value ? new Date(value).toLocaleDateString() : ``;
      },
    }),
    columnHelper.display({
      id: `actions`,
      // eslint-disable-next-line sort-keys
      header: `Actions`,
      // eslint-disable-next-line sort-keys
      cell: ({ row }) =>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleDelete(row.original.id)}
        >
          Delete
        </Button>
      ,
    }),
  ];

  useEffect(() => {
    const fetchAssessments = async () => {
      const data = await AssessmentService.getList();
      setAssessments(data);
    };
    fetchAssessments();

    console.log();
  }, []);

  const [ globalFilter, setGlobalFilter ] = useState(``);

  const table = useReactTable({
    columns,
    data: assessments,
    state: {
      globalFilter,
    },
    // eslint-disable-next-line sort-keys
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: `includesString`,
    onGlobalFilterChange: setGlobalFilter,
  });

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js

  const handleDelete = async (id) => {
    if (window.confirm(`Confirm deleting this assignment?`)) {
      try {
        await AssessmentService.delete(id);
        setAssessments(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error();
      }
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: `center` }}>Assessment List</h2>

      <input
        type="text"
        placeholder="Search..."
        value={globalFilter ?? ``}
        onChange={e => setGlobalFilter(e.target.value)}
      />

      &nbsp;

      <input
        type="date"
        placeholder="mm,dd,yyyy"
        value={globalFilter ?? ``}
        onChange={e => setGlobalFilter(e.target.value)}
      />

      <table className="assessment-table">
        <thead>
          {table.getHeaderGroups().map(headerGroup =>
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header =>
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ?
                    null :
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  {{
                    asc: ` ↑ `,
                    desc: ` ↓ `,
                  }[header.column.getIsSorted()] ?? null}
                </th>)}
            </tr>)}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row =>
            <tr key={row.id}>
              {row.getVisibleCells().map(cell =>
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>)}
            </tr>)}
        </tbody>
      </table>

      <div className="buttons">

        <div className="left_buttons">
          <Button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {`<<<`}
          </Button>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {`Previous Page`}
          </Button>
        </div>

        <div className="right_buttons">
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {`Next Page`}
          </Button>
          <Button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {`>>>`}
          </Button>
        </div>
      </div>

      <span className="page_number">
        <div> Page &nbsp;
          {table.getState().pagination.pageIndex + 1} of {``}
          {table.getPageCount().toLocaleString()}
        </div>
      </span>

      {/*
          List goes here
          Please use the library react-table https://www.npmjs.com/package/react-table
      */}
    </div>
  );
};
