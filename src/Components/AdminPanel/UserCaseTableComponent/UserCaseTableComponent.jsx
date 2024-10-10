import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import "./UserCaseTableComponent.css"; // Import the CSS file
import arrowMore from '/AdminPanelHomeImages/arrow-next-small-svgrepo-com.svg';
import UserCasePopupWindow from "../UserCasePopupWindow/UserCasePopupWindow";

function UserCaseTableComponent({ data, columnHeaders }) {
  const [filters, setFilters] = useState({
    caseCategory: "",
  });

  const [dropdownVisible, setDropdownVisible] = useState({
    caseCategory: false,
  });

  const [selectedRowData, setSelectedRowData] = useState(null); // To hold the selected row data
  const [isPopupVisible, setIsPopupVisible] = useState(false); // To manage popup visibility

  // Handle closing the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".filter-icon-wrapper")) {
        setDropdownVisible({ caseCategory: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredData = data.filter(
    (row) =>
      (filters.caseCategory === "" || row.caseCategory === filters.caseCategory)
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

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header-center">{columnHeaders.caseaffecter}</th>
            <th className="table-header-filter">
              {columnHeaders.caseCategory}
              <div
                className="filter-icon-wrapper"
                onClick={() => toggleDropdown("caseCategory")}
              >
                <FaFilter className="filter-icon" title="Filter" />
                {dropdownVisible.caseCategory && (
                  <div className="filter-dropdown-list">
                    <div onClick={() => handleFilterChange("caseCategory", "")}>
                      All
                    </div>
                    {uniqueColumnValues("caseCategory").map((val, index) => (
                      <div
                        key={index}
                        onClick={() => handleFilterChange("caseCategory", val)}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </th>
            <th className="table-header-filter">{columnHeaders.caseOpener}</th>
            <th className="table-header-center">{columnHeaders.column4}</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{row.affecterFname +' '+ row.affecterLname}</td>
              <td>{row.caseCategory}</td>
              <td>{row.openerFname +' '+ row.openerLname}</td>
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
        />
      )}
    </div>
  );
}

export default UserCaseTableComponent;
