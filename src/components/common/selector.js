import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Dropdown } from "react-bootstrap";
import { filterSelectorShowed, filterSelectorHided } from "../redux/admin";

function Selector(props) {
  Selector.prototype = {
    currentTable: PropTypes.object.isRequired,
    filterSelectorShowed: PropTypes.func.isRequired,
    filterSelectorHided: PropTypes.func.isRequired,
  };

  const {
    currentTable,
    filterSelectorShowed,
    filterSelectorHided,
    filters,
    currentFilter,
    filterType,
    handleFilter,
    currentOption,
    handleOption,
    filterOptions,
    resetCurrentOption,
  } = props;

  const [options, setOptions] = useState(filters);

  useEffect(() => {
    const getOption = () => {
      if (filterType === "filterList") setOptions(filters);
      if (filterType === "filterOptions")
        setOptions(filterOptions(currentFilter));
    };
    getOption();
    if (!currentTable?.filters) filterSelectorHided();
  }, [filters, currentFilter]);

  return (
    <div>
      {filters && (
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic" size="sm">
            {currentFilter === "Filters" && <i className="fa fa-filter"></i>}
            {filterType === "filterList"
              ? currentFilter
              : currentOption === true
              ? "true"
              : currentOption === false
              ? "false"
              : currentOption}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {options?.map((filter) => (
              <Dropdown.Item
                key={filterType + filter}
                onClick={() => {
                  filterSelectorShowed();
                  if (filterType === "filterList") {
                    handleFilter(filter);
                    resetCurrentOption("Options");
                  }
                  if (filterType === "filterOptions") {
                    handleOption(filter);
                  }
                }}
              >
                {filter === true ? "true" : filter === false ? "false" : filter}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({ currentTable: state.admin.currentTable });

export default connect(mapStateToProps, {
  filterSelectorShowed,
  filterSelectorHided,
})(Selector);
