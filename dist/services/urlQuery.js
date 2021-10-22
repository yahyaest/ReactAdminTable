"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleUrlQueries = handleUrlQueries;

function handleUrlQueries(queryParams, search, filter, option, page, pageSize, sortBy, sortOrder) {
  queryParams.set("search", search);
  queryParams.set("filter", filter);
  queryParams.set("filterOption", option);
  queryParams.set("page", page);
  queryParams.set("pageSize", pageSize);
  queryParams.set("sortBy", sortBy);
  queryParams.set("sortOrder", sortOrder);
  return queryParams;
}