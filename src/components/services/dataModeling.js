import React from "react";

export function getSelectedTable(tables, tableName) {
  const selectedTable = tables?.filter(
    (table) => table.data.name === tableName
  )[0];
  return selectedTable;
}

export function getTableData(table) {
  return table.data?.table;
}

export function getUpdatedTable(type, currentTable, object, id = 0) {
  let newCurrentTable = { ...currentTable };
  let newCurrentTableData = { ...newCurrentTable.data };
  let newData = [...newCurrentTableData.table];

  const index = newData.findIndex((obj) => obj.id === id);

  if ((type = "Add")) newData.push(object);
  else if ((type = "Update")) {
    newData[index] = object;
  } else {
    newData.splice(index, 1);
  }

  newCurrentTableData.table = newData;
  newCurrentTable.data = newCurrentTableData;
  return newCurrentTable;
}

export function handleNestedProperty(element, path) {
  if (path) {
    const keys = path.split(".");
    let result = element;
    keys.forEach((key) => {
      try {
        result = result[`${key}`];
      } catch (error) {
        //  return alert(error);
        //  return toast.error(error);
      }
    });

    return result;
  }
}

export function handleRelatedProperty(tables, relatedObj, element) {
  if (relatedObj) {
    let result = tables.filter(
      (table) => table?.data.name === relatedObj.tableName
    )[0]?.data.table;

    const id = handleNestedProperty(element, relatedObj.related_id);
    result = result?.filter((res) => res.id === id || res._id === id)[0][
      `${relatedObj.property}`
    ];

    if (relatedObj.type === "string" || relatedObj.type === "number")
      return result;

    if (relatedObj.type === "image")
      return (
        <img
          src={
            relatedObj.imagesUrl === ""
              ? `${result}`
              : `${relatedObj.imagesUrl}/${result}`
          }
          alt={`${result}`}
          className="skeleton"
        ></img>
      );
    //return result;}
  }
}

export function getTableCelluleData(tables, table, element, column) {
  if (column.imageProperty)
    return (
      <div>
        <img
          src={
            table?.data?.imagesUrl === ""
              ? `${element[`${column.imageProperty}`]}`
              : `${table?.data?.imagesUrl}/${
                  element[`${column.imageProperty}`]
                }`
          }
          alt={`${element[`${column.imageProperty}`]}`}
          className="skeleton"
        ></img>
        {element[`${column.title}`]}
      </div>
    );

  if (column.image)
    return (
      <img
        src={
          table?.data?.imagesUrl !== ""
            ? `${table?.data?.imagesUrl}/${element[`${column.title}`]}`
            : `${element[`${column.title}`]}`
        }
        alt={`${element[`${column.title}`]}`}
        className="skeleton"
      ></img>
    );

  if (column.relatedProperty)
    return (
      <div>
        {handleRelatedProperty(tables, column.relatedProperty, element)}
        {`${handleNestedProperty(element, column.title)}`}
      </div>
    );
  if (handleNestedProperty(element, column.title) === true) return "true";
  if (handleNestedProperty(element, column.title) === false) return "false";
  return handleNestedProperty(element, column.title);
}

export function getPropertyUrl(element, urlObj) {
  const id = handleNestedProperty(element, urlObj.id);
  return `/admin/${urlObj.tableName}/${id}`;
}
