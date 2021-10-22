import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "admin",
  initialState: {
    tables: [],
    currentTable: {},
    tableStates: { createButton: false, filterSelector: false },
  },
  reducers: {
    tableAdded: (tables, action) => {
      tables.tables.push(action.payload);
    },
    tablesLoaded: (tables, action) => {
      tables.tables = action.payload;
    },
    tableLoaded: (tables, action) => {
      tables.currentTable = action.payload;
    },
    tableUpdated: (tables, action) => {
      const index = tables.tables.findIndex(
        (table) => table.data.name === action.tableName
      );
      tables.tables[index] = action.payload;
    },
    tableRemoved: (tables, action) => {
      const index = tables.findIndex((table) => table.id === action.id);
      tables.splice(index, 1);
    },
    showCreateButton: (tables, action) => {
      tables.tableStates.createButton = action.payload;
    },
    hideCreateButton: (tables, action) => {
      tables.tableStates.createButton = action.payload;
    },
    showFilterSelector: (tables, action) => {
      tables.tableStates.filterSelector = action.payload;
    },
    hideFilterSelector: (tables, action) => {
      tables.tableStates.filterSelector = action.payload;
    },
  },
});

console.log(slice);

export const {
  tableAdded,
  tablesLoaded,
  tableLoaded,
  tableUpdated,
  tableRemoved,
  showCreateButton,
  hideCreateButton,
  showFilterSelector,
  hideFilterSelector,
} = slice.actions;
export default slice.reducer;

// Action Creators
export const loadTables = (data) => async (dispatch) => {
  dispatch({
    type: slice.actions.tablesLoaded.type,
    payload: data,
  });
};

export const loadTable = (data) => async (dispatch) => {
  dispatch({
    type: slice.actions.tableLoaded.type,
    payload: data,
  });
};

export const addTable =
  (
    data,
    tableAttributes,
    search,
    filters,
    elementAdd,
    elementUpdate,
    elementDelete
  ) =>
  async (dispatch) => {
    dispatch({
      type: slice.actions.tableAdded.type,
      payload: {
        data,
        tableAttributes,
        search,
        filters,
        elementAdd,
        elementUpdate,
        elementDelete,
      },
    });
  };

export const updateTable = (data, tableName) => async (dispatch) => {
  dispatch({
    type: slice.actions.tableUpdated.type,
    payload: data,
    tableName,
  });
};

export const createButtonShowed = () => async (dispatch) => {
  dispatch({
    type: slice.actions.showCreateButton.type,
    payload: true,
  });
};

export const createButtonHided = () => async (dispatch) => {
  dispatch({
    type: slice.actions.hideCreateButton.type,
    payload: false,
  });
};

export const filterSelectorShowed = () => async (dispatch) => {
  dispatch({
    type: slice.actions.showFilterSelector.type,
    payload: true,
  });
};

export const filterSelectorHided = () => async (dispatch) => {
  dispatch({
    type: slice.actions.hideFilterSelector.type,
    payload: false,
  });
};
