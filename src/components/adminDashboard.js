import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { loadTable, createButtonShowed } from "./redux/admin";
import { sleepTime } from "./services/sleepFunction";

function AdminDashboard(props) {
  AdminDashboard.prototype = {
    tables: PropTypes.array.isRequired,
    loadTable: PropTypes.func.isRequired,
    createButtonShowed: PropTypes.func.isRequired,
  };

  const {
    tables,
    loadTable,
    createButtonShowed,
    onPageChange,
    resetSearchString,
    resetCurrentFilter,
    resetCurrentOption,
  } = props;

  let history = useHistory();

  useEffect(() => {
    async function fetchData() {
      await sleepTime(100);
      const tableName = window.location.pathname
        .replace("/admin/", "")
        .replace("/", "");
      const tableIndex = tables.findIndex(
        (table) => table.data.name === tableName
      );
      if (tableIndex !== -1) {
        loadTable(tables[tableIndex]);
      } else {
        loadTable(tables[tables.length - 1]);
      }
      createButtonShowed();
    }
    fetchData();
  }, [tables]);

  return (
    <div>
      <nav className="slideBar">
        <ul className="slideBar__list">
          {tables.map((table) => (
            <li
              key={table.data.name}
              className="slideBar__item"
              onClick={(e) => {
                // Selected Element Style
                e.currentTarget.parentElement.childNodes.forEach((element) => {
                  element.classList.remove("slideBar__item__selected");
                });
                e.currentTarget.classList.add("slideBar__item__selected");

                // Get Table Data
                let currentTableName = "";
                tables.map((table) => {
                  if (e.currentTarget.innerHTML.includes(table.data.name))
                    currentTableName = table.data.name;
                });

                currentTableName = e.currentTarget.innerText
                  ? e.currentTarget.innerText
                  : currentTableName;

                const currentTableData = tables.find(
                  (table) => table.data.name === currentTableName
                );
                loadTable(currentTableData);

                // Handle Table Options
                createButtonShowed();
                onPageChange(1);
                resetSearchString("");
                resetCurrentFilter("Filters");
                resetCurrentOption("Options");
                history.push(`/admin/${currentTableData.data.name}`);
              }}
            >
              {table.data.icon && (
                <div className="slideBar__icon"> {table.data.icon}</div>
              )}
              <p className="slideBar__title">{table.data.name}</p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

const mapStateToProps = (state) => ({
  tables: state.admin.tables,
});

export default connect(mapStateToProps, {
  loadTable,
  createButtonShowed,
})(AdminDashboard);
