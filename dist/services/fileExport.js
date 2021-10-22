"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportToJsonFile = exportToJsonFile;
exports.exportToCsvFile = exportToCsvFile;

function exportToJsonFile(jsonData, id, name) {
  var dataStr = JSON.stringify(jsonData);
  var dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
  var exportFileDefaultName = "".concat(name, ".json");
  var linkElement = document.getElementById(id);
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName); // linkElement.click();
}

function parseJSONToCSVStr(jsonData) {
  if (jsonData.length === 0) {
    return "";
  }

  var keys = Object.keys(jsonData[0]);
  var columnDelimiter = ",";
  var lineDelimiter = "\n";
  var csvColumnHeader = keys.join(columnDelimiter);
  var csvStr = csvColumnHeader + lineDelimiter;
  jsonData.forEach(function (item) {
    keys.forEach(function (key, index) {
      if (index > 0 && index < keys.length) {
        csvStr += columnDelimiter;
      }

      csvStr += item[key];
    });
    csvStr += lineDelimiter;
  });
  return encodeURIComponent(csvStr);
}

function exportToCsvFile(jsonData, id, name) {
  var csvStr = parseJSONToCSVStr(jsonData);
  var dataUri = "data:text/csv;charset=utf-8," + csvStr;
  var exportFileDefaultName = "".concat(name, ".csv");
  var linkElement = document.getElementById(id);
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName); // linkElement.click();
}