import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { getTableCelluleData, getPropertyUrl } from "./services/dataModeling";
import { sleepTime } from "./services/sleepFunction";

function AdminTable(props) {
  AdminTable.prototype = {
    currentTable: PropTypes.object.isRequired,
  };

  const {
    tables,
    currentTable,
    onSort,
    onPageChange,
    renderSortIcon,
    modelData,
  } = props;

  const [tableAttributes, setTableAttributes] = useState([]);

  let history = useHistory();

  const getAttibutes = () => {
    let attributes = currentTable?.tableAttributes;
    attributes = attributes?.filter(
      (attribute) =>
        attribute.display === "table" || attribute.display === "table/form"
    );
    setTableAttributes(attributes);
    return attributes;
  };

  useEffect(() => {
    getAttibutes();
  }, [currentTable]);

  const handleDelete = async (id) => {
    const elementDeleted = await currentTable.elementDelete(id);

    if (elementDeleted && !elementDeleted?.isError) {
      onPageChange(1);
      toast.dark("Item deleted successfully.");
    } else if (elementDeleted && elementDeleted?.isError) {
      toast.error(elementDeleted?.errorMessage);
    } else {
      onPageChange(1);
    }

    await sleepTime(2000);
    window.location.reload();
  };

  return (
    <div>
      <Table
        // striped
        bordered
        hover
        variant="light"
        size="sm"
        responsive="md"
        className="admin__table"
        style={{
          width: "80%",
          margin: "0 auto",
          textAlign: "center",
          borderRadius: "10px",
          borderStyle: "hidden",
          borderCollapse: "collapse",
          overflow: "hidden",
        }}
      >
        <thead className="thead-dark">
          <tr>
            {tableAttributes?.map((column) => (
              <th
                key={column.title}
                onClick={() => onSort(column.title)}
                style={{
                  cursor: "pointer",
                  color: "white",
                  backgroundColor: "#343a40",
                }}
              >
                {column.label}
                {renderSortIcon(column.title)}
              </th>
            ))}
            {currentTable?.elementUpdate && (
              <th style={{ color: "white", backgroundColor: "#343a40" }}>
                update
              </th>
            )}
            {currentTable?.elementDelete && (
              <th style={{ color: "white", backgroundColor: "#343a40" }}>
                delete
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {modelData?.map((element) => (
            <tr key={element.id || element._id}>
              {tableAttributes?.map((column) => (
                <td
                  key={column.title}
                  className={column.urlForm ? "cellule__link" : ""}
                  onClick={() => {
                    if (column.urlForm) {
                      const url = getPropertyUrl(element, column.urlForm);
                      history.push(url);
                    }
                  }}
                >
                  {getTableCelluleData(tables, currentTable, element, column)}
                </td>
              ))}
              {currentTable?.elementUpdate && (
                <td>
                  <Link
                    to={`/admin/${currentTable?.data?.name}/${
                      element.id || element._id
                    }/`}
                    className="btn btn-warning btn-sm"
                  >
                    <i
                      className="fa fa-edit"
                      style={{ marginRight: "3px" }}
                    ></i>
                    Update
                  </Link>
                </td>
              )}
              {currentTable?.elementDelete && (
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(element.id || element._id)}
                  >
                    <i
                      className="fa fa-trash"
                      style={{ marginRight: "3px" }}
                    ></i>
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentTable: state.admin.currentTable,
  tables: state.admin.tables,
});

export default connect(mapStateToProps, {})(AdminTable);
