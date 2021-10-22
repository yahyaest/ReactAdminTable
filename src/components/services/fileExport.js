export function exportToJsonFile(jsonData, id, name) {
  let dataStr = JSON.stringify(jsonData);
  let dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  let exportFileDefaultName = `${name}.json`;

  let linkElement = document.getElementById(id);
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  // linkElement.click();
}

function parseJSONToCSVStr(jsonData) {
  if (jsonData.length === 0) {
    return "";
  }

  let keys = Object.keys(jsonData[0]);

  let columnDelimiter = ",";
  let lineDelimiter = "\n";

  let csvColumnHeader = keys.join(columnDelimiter);
  let csvStr = csvColumnHeader + lineDelimiter;

  jsonData.forEach((item) => {
    keys.forEach((key, index) => {
      if (index > 0 && index < keys.length) {
        csvStr += columnDelimiter;
      }
      csvStr += item[key];
    });
    csvStr += lineDelimiter;
  });

  return encodeURIComponent(csvStr);
}

export function exportToCsvFile(jsonData, id, name) {
  let csvStr = parseJSONToCSVStr(jsonData);
  let dataUri = "data:text/csv;charset=utf-8," + csvStr;

  let exportFileDefaultName = `${name}.csv`;

  let linkElement = document.getElementById(id);
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);

  // linkElement.click();
}
