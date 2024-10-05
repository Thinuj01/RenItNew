import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserApprovalTableComponent.css"; // Import the CSS file
import arrowMore from '/AdminPanelHomeImages/arrow-next-small-svgrepo-com.svg';
import UserApprovalPopupWindow from "../UserApprovalPopupWindow/UserApprovalPopupWindow";

function UserApprovalTableComponent({ data, columnHeaders }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    district: "",
  });

  const [dropdownVisible, setDropdownVisible] = useState({
    district: false,
  });

  const [selectedRowData, setSelectedRowData] = useState(null); // To hold the selected row data
  const [isPopupVisible, setIsPopupVisible] = useState(false); // To manage popup visibility

  // Handle closing the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".filter-icon-wrapper")) {
        setDropdownVisible({ district: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const district = params.get("district");
    if (district) {
        setFilters((prev) => ({ ...prev, district }));
        navigate(window.location.pathname, { replace: true });
    }
  }, [location.search]);

  const filteredData = data.filter(
    (row) =>
      (filters.district === "" || row.district === filters.district)
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
    window.location.reload();
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
            <th className="table-header-center">{columnHeaders.NIC}</th>
            <th className="table-header-center">{columnHeaders.firstname}</th>
            <th className="table-header-filter">
              {columnHeaders.district}
              <div
                className="filter-icon-wrapper"
                onClick={() => toggleDropdown("district")}
              >
                <FaFilter className="filter-icon" title="Filter" />
                {dropdownVisible.district && (
                  <div className="filter-dropdown-list">
                    <div onClick={() => handleFilterChange("district", "")}>
                      All
                    </div>
                    {uniqueColumnValues("district").map((val, index) => (
                      <div
                        key={index}
                        onClick={() => handleFilterChange("district", val)}
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
              <td>{row.NIC_number}</td>
              <td>{row.first_name}</td>
              <td>{row.district}</td>
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
        <UserApprovalPopupWindow
          selectedRowData={selectedRowData}
          onClose={closePopup}
          onSubmit={handleSubmit}
          onReject={handleReject}
        />
      )}
    </div>
  );
}

export default UserApprovalTableComponent;
