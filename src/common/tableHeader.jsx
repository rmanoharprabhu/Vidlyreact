import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    this.props.sortColumn.path = path;
    const selectedSortType =
      this.props.sortColumn.sortType === "asc" ? "desc" : "asc";
    this.props.sortColumn.sortType = selectedSortType;
    this.props.onSort(this.props.sortColumn);
  };

  render() {
    const pointerStyle = { cursor: "pointer" };
    const noPointerStyle = { cursor: "context-menu" };
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              style={column.path !== "" ? pointerStyle : noPointerStyle}
              key={column.id}
              onClick={() =>
                column.path === "" ? null : this.raiseSort(column.path)
              }
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
