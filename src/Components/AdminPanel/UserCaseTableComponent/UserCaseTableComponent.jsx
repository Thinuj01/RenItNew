import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import "./UserCaseTableComponent.css"; // Import the CSS file
import arrowMore from '/AdminPanelHomeImages/arrow-next-small-svgrepo-com.svg';
import UserCasePopupWindow from "../UserCasePopupWindow/UserCasePopupWindow";

function UserCaseTableComponent({ data, columnHeaders }) {
  const [filters, setFilters] = useState({
    column2: "",
    column3: "",
  });

  const [dropdownVisible, setDropdownVisible] = useState({
    column2: false,
    column3: false,
  });

  const [selectedRowData, setSelectedRowData] = useState(null); // To hold the selected row data
  const [isPopupVisible, setIsPopupVisible] = useState(false); // To manage popup visibility

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

  const openPopup = (rowData) => {
    setSelectedRowData(rowData); // Set the selected row data
    setIsPopupVisible(true); // Show the popup
  };

  const closePopup = () => {
    setIsPopupVisible(false); // Hide the popup
    setSelectedRowData(null); // Clear the selected row data
  };

  const handleSubmit = () => {
    // Handle submission logic here
    alert("User approved!");
    closePopup(); // Close the popup after submission
  };

  const handleReject = () => {
    // Handle rejection logic here
    alert("User rejected!");
    closePopup(); // Close the popup after rejection
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
                <div className="tableMoreView" onClick={() => openPopup(row)}>
                  <img src={arrowMore} alt="" className='tableMoreViewIcon' />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupVisible && (
        <UserCasePopupWindow
          selectedRowData={selectedRowData}
          onClose={closePopup}
          onSubmit={handleSubmit}
          onReject={handleReject}
        />
      )}
    </div>
  );
}

export default UserCaseTableComponent;
