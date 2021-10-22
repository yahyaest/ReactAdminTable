import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { addTable } from "./redux/admin";
function ListTable(props) {
  ListTable.prototype = {
    tables: PropTypes.array.isRequired,
    addTable: PropTypes.func.isRequired,
  };

  const {
    tables,
    addTable,
    data,
    tableAttributes,
    search,
    filters,
    elementAdd,
    elementUpdate,
    elementDelete,
  } = props;

  const tableExist = (tableName) => {
    const tableIndex = tables.findIndex(
      (table) => table.data.name === tableName
    );
    return tableIndex;
  };

  useEffect(() => {
    async function fetchData() {
      if (tableExist(data.name) === -1 && data.table.length > 0)
        addTable(
          data,
          tableAttributes,
          search,
          filters,
          elementAdd,
          elementUpdate,
          elementDelete
        );
    }
    fetchData();
  }, [data.table]);

  return <div></div>;
}

const mapStateToProps = (state) => ({ tables: state.admin.tables });

export default connect(mapStateToProps, { addTable })(ListTable);
