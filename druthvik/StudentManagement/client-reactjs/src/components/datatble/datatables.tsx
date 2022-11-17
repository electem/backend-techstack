import React from "react";
import DataTable from "react-data-table-component";
import data from "../../data.json";

const columns = [
  {
    name: "Word",
    selector: "word",
  },
  {
    name: "Translation",
    selector: "translation",
  },
];

export function datatables() {
  return (
    <div className="App">
      <DataTable title="Employees" columns={columns} data={data} pagination />
    </div>
  );
}

export default datatables;
