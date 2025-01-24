import React, { useState } from "react";
import { getCurrentDate } from "../../utils/getCurrentDate";

export default function EditableCell({
  value: initialValue,
  row,
  column,
  updateRecord,
  editable,
  isDate
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(isDate ? getCurrentDate(initialValue) : initialValue);

  const onBlur = () => {
    setIsEditing(false);
    updateRecord(row.index, column.id, value);
  };

  return (
    <div
      onClick={() => (editable ? setIsEditing(true) : null)}
      style={{ cursor: editable ? "pointer" : "default" }}
    >
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          autoFocus
          style={{ width: "100%" }}
        />
      ) : typeof value === "string" ? (
        value
      ) : (
        value.toString()
      )}
    </div>
  );
}
