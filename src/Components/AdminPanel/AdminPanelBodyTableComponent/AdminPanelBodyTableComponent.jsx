import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import "./AdminPanelBodyTableComponent.css"; // Import the CSS file
import arrowMore from '/AdminPanelHomeImages/arrow-next-small-svgrepo-com.svg';

function AdminPanelBodyTableComponent({ data, columnHeaders }) {
  const [filters, setFilters] = useState({
    column2: "",
    column3: "",
  });

  const [dropdownVisible, setDropdownVisible] = useState({
    column2: false,
    column3: false,
  });

  // Handle closing the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".filter-icon-wrapper")) {
        setDropdownVisible({ column2: false, column3: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredData = data.filter(
    (row) =>
      (filters.column2 === "" || row.column2 === filters.column2) &&
      (filters.column3 === "" || row.column3 === filters.column3)
  );

  const handleFilterChange = (column, value) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
    setDropdownVisible((prev) => ({ ...prev, [column]: false })); // Close dropdown after selection
  };

  const uniqueColumnValues = (column) => {
    return [...new Set(data.map((item) => item[column]))];
  };

  const toggleDropdown = (column) => {
    setDropdownVisible((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header-center">{columnHeaders.column1}</th>
            <th className="table-header-filter">
              {columnHeaders.column2}
              <div
                className="filter-icon-wrapper"
                onClick={() => toggleDropdown("column2")}
              >
                <FaFilter className="filter-icon" title="Filter" />
                {dropdownVisible.column2 && (
                  <div className="filter-dropdown-list">
                    <div onClick={() => handleFilterChange("column2", "")}>
                      All
                    </div>
                    {uniqueColumnValues("column2").map((val, index) => (
                      <div
                        key={index}
                        onClick={() => handleFilterChange("column2", val)}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </th>
            <th className="table-header-filter">
              {columnHeaders.column3}
              <div
                className="filter-icon-wrapper"
                onClick={() => toggleDropdown("column3")}
              >
                <FaFilter className="filter-icon" title="Filter" />
                {dropdownVisible.column3 && (
                  <div className="filter-dropdown-list">
                    <div onClick={() => handleFilterChange("column3", "")}>
                      All
                    </div>
                    {uniqueColumnValues("column3").map((val, index) => (
                      <div
                        key={index}
                        onClick={() => handleFilterChange("column3", val)}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </th>
            <th className="table-header-center">{columnHeaders.column4}</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{row.column1}</td>
              <td>{row.column2}</td>
              <td>{row.column3}</td>
              <td>
                <div className="tableMoreView" onClick={() => alert(`Button clicked for: ${row.column1}`)}>
                  <img src={arrowMore} alt="" className='tableMoreViewIcon' />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanelBodyTableComponent;
