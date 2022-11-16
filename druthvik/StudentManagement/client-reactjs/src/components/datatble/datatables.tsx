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
      <h3>
        DataTable in React -{" "}
        <a href="https://www.cluemediator.com" target="_blank">
          Clue Mediator
        </a>
      </h3>
      <DataTable title="Employees" columns={columns} data={data} pagination />
    </div>
  );
}

export default datatables;
