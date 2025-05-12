import React, { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import './index.css';

import { AssessmentService } from '../../services/AssessmentService';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor(`id`, {
    header: `ID`,
  }),
  columnHelper.accessor(`catName`, {
    header: `Cat Name`,
  }),
  columnHelper.accessor(`catDateOfBirth`, {
    header: `Birth Date`,
  }),
  columnHelper.accessor(`instrumentType`, {
    header: `Instrument Type`,
  }),
  columnHelper.accessor(`score`, {
    header: `Score`,
  }),
  columnHelper.accessor(`riskLevel`, {
    header: `Risk Level`,
  }),
  columnHelper.accessor(`createdAt`, {
    header: `Created On`,
  }),
  columnHelper.accessor(`editedAt`, {
    header: `Updated On`,
  }),
];

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  useEffect(() => {
    const fetchAssessments = async () => {
      const data = await AssessmentService.getList();
      setAssessments(data);
    };
    fetchAssessments();

    console.log();
  }, []);

  const table = useReactTable({
    columns,
    data: assessments,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js

  return (
    <div>
      <h2 style={{ textAlign: `center` }}>Assessment List</h2>

      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup =>
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header =>
                <th key={header.id}>
                  {header.isPlaceholder ?
                    null :
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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

      {/*
          List goes here
          Please use the library react-table https://www.npmjs.com/package/react-table
      */}
    </div>
  );
};
