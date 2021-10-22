import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Selector from "./common/selector";
import { exportToJsonFile, exportToCsvFile } from "./services/fileExport";

function AdminMenu(props) {
  AdminMenu.prototype = {
    currentTable: PropTypes.object.isRequired,
    createButton: PropTypes.bool.isRequired,
  };

  const [show, setShow] = useState(false);

  const {
    currentTable,
    createButton,
    filterSelector,
    filters,
    currentFilter,
    handleFilter,
    currentOption,
    handleOption,
    filterOptions,
    resetCurrentOption,
  } = props;
  let history = useHistory();

  const dataToDownload = currentTable?.data?.table;

  return (
    <div>
      {createButton && (
        <div className="menu__bar">
          {filterSelector && (
            <Selector
              filters={filterOptions}
              filterType="filterOptions"
              currentFilter={currentFilter}
              handleFilter={handleFilter}
              currentOption={currentOption}
              handleOption={handleOption}
              filterOptions={filterOptions}
              resetCurrentOption={resetCurrentOption}
            />
          )}
          <Selector
            filters={filters}
            filterType="filterList"
            currentFilter={currentFilter}
            handleFilter={handleFilter}
            currentOption={currentOption}
            handleOption={handleOption}
            filterOptions={filterOptions}
            resetCurrentOption={resetCurrentOption}
          />

          {currentTable?.elementAdd && (
            <div
              className="new__item"
              onClick={() =>
                history.push(`/admin/${currentTable?.data?.name}/new`)
              }
            >
              <i className="fa fa-plus-circle"></i>
              Add new
            </div>
          )}

          <div className="export__data" onClick={() => setShow(!show)}>
            <i className="fa fa-download"></i>
            Export
            {show && (
              <div>
                <div className="export__json">
                  <a
                    href="a"
                    id="download_json"
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={() => {
                      exportToJsonFile(
                        dataToDownload,
                        "download_json",
                        currentTable.data.name
                      );
                    }}
                  >
                    JSON
                  </a>
                </div>
                <div className="export__csv">
                  <a
                    href="a"
                    id="download_csv"
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={() => {
                      exportToCsvFile(
                        dataToDownload,
                        "download_csv",
                        currentTable.data.name
                      );
                    }}
                  >
                    CSV
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentTable: state.admin.currentTable,
  createButton: state.admin.tableStates?.createButton,
  filterSelector: state.admin.tableStates?.filterSelector,
});

export default connect(mapStateToProps, {})(AdminMenu);
