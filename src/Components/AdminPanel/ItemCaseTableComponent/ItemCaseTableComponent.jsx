import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import "./ItemCaseTableComponent.css"; // Import the CSS file
import arrowMore from '/AdminPanelHomeImages/arrow-next-small-svgrepo-com.svg';
import ItemCasePopupWindow from "../ItemCasePopupWindow/ItemCasePopupWindow";

function ItemCaseTableComponent({ data, columnHeaders }) {
  const [filters, setFilters] = useState({
    caseCategory: "",
  });

  const [dropdownVisible, setDropdownVisible] = useState({
    caseCategory: false,
  });

  const [selectedRowData, setSelectedRowData] = useState(null); // To hold the selected row data
  const [isPopupVisible, setIsPopupVisible] = useState(false); // To manage popup visibility

  const getCaseCategory = (caseId) => {
    const prefix = caseId.substring(0, 3); // Get the first 3 letters of the caseId
    switch (prefix) {
      case "Ite":
        return "Item Not as Described";
      case "Cou":
        return "Counterfeit or Fake Products";
      case "Dam":
        return "Damaged or Defective Goods";
      default:
        return "Other"; // Default case if no match
    }
  };
  
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
      (filters.caseCategory === "" || getCaseCategory(row.case_id) === filters.caseCategory)
  );

  const handleFilterChange = (column, value) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
    setDropdownVisible((prev) => ({ ...prev, [column]: false })); // Close dropdown after selection
  };

  const uniqueCaseCategories = () => {
    return [...new Set(data.map((item) => getCaseCategory(item.case_id)))];
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
    alert("Item approved!");
    closePopup(); // Close the popup after submission
  };

  const handleReject = () => {
    // Handle rejection logic here
    alert("Item rejected!");
    closePopup(); // Close the popup after rejection
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header-center">{columnHeaders.column1}</th>
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
                    {uniqueCaseCategories().map((val, index) => (
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
            <th className="table-header-filter">{columnHeaders.column3}</th>
            <th className="table-header-center">{columnHeaders.column4}</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{row.item_id}</td>
              <td>{getCaseCategory(row.case_id)}</td>
              <td>{row.openerFname+' '+row.openerLname}</td>
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
        <ItemCasePopupWindow
          selectedRowData={selectedRowData}
          onClose={closePopup}
          onSubmit={handleSubmit}
          onReject={handleReject}
        />
      )}
    </div>
  );
}

export default ItemCaseTableComponent;
