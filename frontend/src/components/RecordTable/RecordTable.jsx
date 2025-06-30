import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable, Column, Row, CellProps } from "react-table";
import {
  asyncDeleteRecords,
  asyncUpdateRecords,
} from "../../slices/FinancialRecordSlice";
import EditableCell from "../EditableCell/EditableCell";
import styles from "./RecordTable.module.css";
import Button from "../Button/button";
import { getCurrentDate } from "../../utils/getCurrentDate";

function RecordTable({records}) {
  const dispatch = useDispatch();

  const updateCellRecord = (rowIndex, columnId, value) => {
    const id = records[rowIndex]._id;
    if (id)
      dispatch(asyncUpdateRecords({ ...records[rowIndex], [columnId]: value }));
  };

  const deleteRow = (rowIndex) => {
    const id = records[rowIndex]._id;
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
            value={getCurrentDate(props.value)}
            updateRecord={updateCellRecord}
            editable={false}
          />
        ),
      },
      {
        Header: "Delete",
        id: "delete",
        Cell: ({ row }) => (
          <Button variant="secondary" onClick={() => deleteRow(row.index)}>
            Delete
          </Button>
        ),
      },
    ],
    [records]
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: records });

  return (
    <div className={styles.tableContainer}>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((hg) => {
            const { key, restHeaderGroupProps } = hg.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {hg.headers.map((header) => {
                  const { key, restHeaderProps } = header.getHeaderProps();
                  return (
                    <th
                      key={key}
                      {...restHeaderProps}
                      className={styles.tableHeaderRow}
                    >
                      {header.render("Header")}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()} className={styles.tableBody}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, restRowProps } = row.getRowProps();
            return (
              <tr key={key} {...restRowProps} className={styles.tableBodyRow}>
                {row.cells.map((cell) => {
                  const { key, restCellProps } = cell.getCellProps();
                  return (
                    <td
                      key={key}
                      {...restCellProps}
                      className={styles.tableDataRow}
                    >
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

export default RecordTable;
