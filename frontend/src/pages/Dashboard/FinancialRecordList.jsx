import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable, Column, Row, CellProps } from "react-table";
import EditableCell from "./EditableCell";
import {
  asyncDeleteRecords,
  asyncUpdateRecords,
} from "../../slices/FinancialRecordSlice";

function FinancialRecordList() {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.records.records);

  const updateCellRecord = (rowIndex, columnId, value) => {
    const id = records[rowIndex]._id;
    if (id)
      dispatch(asyncUpdateRecords({ ...records[rowIndex], [columnId]: value }));
  };

  const deleteRow = (rowIndex) => {
    const id = records[rowIndex]._id;
    console.log(id);
    if (id) dispatch(asyncDeleteRecords(id));
  };

  const columns = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={false}
          />
        ),
      },
      {
        Header: "Delete",
        id: "delete",
        Cell: ({ row }) => (
          <button className="button" onClick={() => deleteRow(row.index)}>
            Delete
          </button>
        ),
      },
    ],
    [records]
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: records });

  return (
    <div className="table-container">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((hg) => {
            const { key, restHeaderGroupProps } = hg.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {hg.headers.map((header) => {
                  const { key, restHeaderProps } = header.getHeaderProps();
                  return (
                    <th key={key} {...restHeaderProps}>
                      {header.render("Header")}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, restRowProps } = row.getRowProps();
            return (
              <tr key={key} {...restRowProps}>
                {row.cells.map((cell) => {
                  const { key, restCellProps } = cell.getCellProps();
                  return (
                    <td key={key} {...restCellProps}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FinancialRecordList;
