import React, { useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import _ from "lodash";
import AdminNavbar from "./adminNavbar";
import AdminDashboard from "./adminDashboard";
import AdminMenu from "./adminMenu";
//import AdminTable from "./adminTable";
// import Pagination from "./common/pagination";
import { ToastContainer } from "react-toastify";
import { getTableData } from "./services/dataModeling";
import { filterSelectorShowed } from "./redux/admin";
import { useLocation } from "react-router-dom";
import { handleUrlQueries } from "./services/urlQuery";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
const AdminTable = React.lazy(() => import("./adminTable"));
const Pagination = React.lazy(() => import("./common/pagination"));

function AdminPage(props) {
  AdminPage.prototype = {
    currentTable: PropTypes.object.isRequired,
  };

  const urlSearch = useLocation().search;
  const urlPathname = useLocation().pathname;
  const queryParams = new URLSearchParams(urlSearch);
  const pageQuery = queryParams.get("page");
  const pageSizeQuery = queryParams.get("pageSize");
  const filterQuery = queryParams.get("filter");
  const optionQuery = queryParams.get("filterOption");
  const searchQuery = queryParams.get("search");
  const sortByQuery = queryParams.get("sortBy");
  const sortOrderQuery = queryParams.get("sortOrder");

  const { currentTable, filterSelectorShowed } = props;
  const [sortBy, setSortBy] = useState(sortByQuery ? sortByQuery : "id");
  const [sortOrder, setSortOrder] = useState(
    sortOrderQuery ? sortOrderQuery : "asc"
  );
  const [searchString, setSearchString] = useState(
    searchQuery ? searchQuery : ""
  );
  const [currentPage, setCurrentPage] = useState(
    pageQuery ? parseInt(pageQuery) : 1
  );
  const [currentFilter, setCurrentFilter] = useState(
    filterQuery ? filterQuery : "Filters"
  );
  const [currentOption, setCurrentOption] = useState(
    optionQuery ? optionQuery : "Options"
  );

  const [pageSize, setPageSize] = useState(
    pageSizeQuery ? parseInt(pageSizeQuery) : 10
  );

  //const pageSize = 10;

  if (filterQuery) filterSelectorShowed();

  const handlePageSize = (pageSize) => {
    setPageSize(pageSize);
    setCurrentPage(1);

    handleUrlQueries(
      queryParams,
      searchString,
      currentFilter,
      currentOption,
      1,
      pageSize,
      sortBy,
      sortOrder
    );
    window.history.replaceState({}, "", `${urlPathname}?${queryParams}`);
  };

  const handleSearch = (e) => {
    setCurrentPage(1);
    setSearchString(e.currentTarget.value);
    setCurrentFilter("Filters");
    setCurrentOption("Options");

    handleUrlQueries(
      queryParams,
      e.currentTarget.value,
      "Filters",
      "Options",
      1,
      pageSize,
      sortBy,
      sortOrder
    );
    window.history.replaceState({}, "", `${urlPathname}?${queryParams}`);
  };

  const handleFilter = (filter) => {
    setCurrentFilter(filter);
    setCurrentPage(1);

    handleUrlQueries(
      queryParams,
      searchString,
      filter,
      "Options",
      1,
      pageSize,
      sortBy,
      sortOrder
    );

    window.history.replaceState({}, "", `${urlPathname}?${queryParams}`);
  };
  const handleOption = (option) => {
    setCurrentOption(option);
    setCurrentPage(1);

    handleUrlQueries(
      queryParams,
      searchString,
      currentFilter,
      option,
      1,
      pageSize,
      sortBy,
      sortOrder
    );

    window.history.replaceState({}, "", `${urlPathname}?${queryParams}`);
  };

  const getFilterOptions = (currentFilter) => {
    let filterOptions = ["Options"];
    let result = [];
    if (currentTable?.data?.table) {
      result = getTableData(currentTable);
    }

    result.map((element) => {
      if (currentFilter !== "Filters") {
        let index = filterOptions.indexOf(element[`${currentFilter}`]);
        if (index === -1) filterOptions.push(element[`${currentFilter}`]);
      }
    });

    return filterOptions;
  };

  const renderSortIcon = (sortType) => {
    if (sortType !== sortBy) return null;
    if (sortOrder === "asc")
      return <i className="fa fa-sort-asc" style={{ margin: "0 10px" }}></i>;
    return <i className="fa fa-sort-desc" style={{ margin: "0 10px" }}></i>;
  };

  const onSort = (sortType) => {
    setSortBy(sortType);
    sortOrder === "desc" ? setSortOrder("asc") : setSortOrder("desc");
    setCurrentPage(1);

    handleUrlQueries(
      queryParams,
      searchString,
      currentFilter,
      currentOption,
      1,
      pageSize,
      sortType,
      sortOrder === "desc" ? "asc" : "desc"
    );
    window.history.replaceState({}, "", `${urlPathname}?${queryParams}`);
  };

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleUrlQueries(
      queryParams,
      searchString,
      currentFilter,
      currentOption,
      page,
      pageSize,
      sortBy,
      sortOrder
    );
    window.history.replaceState({}, "", `${urlPathname}?${queryParams}`);
  };

  const getCurrentTableData = (sortType) => {
    if (currentTable?.data?.table) {
      let result = getTableData(currentTable);
      // 1-filter
      let data = [];
      if (searchString && currentTable?.search)
        data = result.filter((element) =>
          element[`${currentTable?.search}`]
            ?.toLowerCase()
            .startsWith(searchString.toLowerCase())
        );
      else if (currentOption === "Options" || !currentTable?.filters)
        data = result;
      else
        data = result.filter(
          (element) => element[`${currentFilter}`] === currentOption
        );
      // 2-sort
      const sorted = _.orderBy(data, sortType, sortOrder);
      // 3-paginate
      const count =
        currentOption === "Options" && !searchString
          ? result.length
          : data.length;
      const pagesCount = Math.ceil(count / pageSize);
      const activePage = currentPage > pagesCount ? 1 : currentPage;
      const modelData = paginate(sorted, activePage, pageSize);

      return {
        modelData,
        count,
      };
    } else return [];
  };

  const { modelData, count } = getCurrentTableData(sortBy);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AdminNavbar handleSearch={handleSearch} search={searchString} />
      <AdminDashboard
        onPageChange={handlePageChange}
        resetCurrentFilter={setCurrentFilter}
        resetCurrentOption={setCurrentOption}
        resetSearchString={setSearchString}
      />
      <AdminMenu
        filters={currentTable?.filters}
        currentFilter={currentFilter}
        handleFilter={handleFilter}
        currentOption={currentOption}
        handleOption={handleOption}
        filterOptions={getFilterOptions}
        resetCurrentOption={setCurrentOption}
      />

      <React.Suspense
        fallback={
          <Spinner
            animation="border"
            variant="dark"
            className="spinner__loading"
          />
        }
      >
        <AdminTable
          onSort={onSort}
          renderSortIcon={renderSortIcon}
          onPageChange={handlePageChange}
          modelData={modelData}
        />
        <Pagination
          itemsCounts={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          handlePageSize={handlePageSize}
        />
      </React.Suspense>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentTable: state.admin.currentTable,
});

export default connect(mapStateToProps, { filterSelectorShowed })(AdminPage);
