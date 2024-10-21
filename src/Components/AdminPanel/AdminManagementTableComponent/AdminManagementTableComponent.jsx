import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminManagementTableComponent.css";

function AdminManagementTableComponent({ data, columnHeaders }) {
  const [userData, setUserData] = useState([]);

  const handlePromote = async (nic) => {
    console.log(nic);
    try {
      const response = await axios.get("http://localhost:80/RentIT/Controllers/getUserDetailsController.php", {
        params: { nic: nic, status: "3" }
      });
      if (response.data.success) {
        setUserData((prevData) =>
          prevData.map((user) =>
            user.NIC_number === nic ? { ...user, is_Admin: 1 } : user
          )
        );
        alert("User promoted successfully!");
      } else {
        alert("Failed to promote user.");
      }
    } catch (error) {
      console.error("Error promoting user:", error);
      alert("An error occurred while promoting the user.");
    }
  };

  useEffect (()=>{
    if(data){
      setUserData(data);
    }
    
  },[data])

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header-center">{columnHeaders.NIC}</th>
            <th className="table-header-center">{columnHeaders.firstname}</th>
            <th className="table-header-center">{columnHeaders.lastname}</th>
            <th className="table-header-center">{columnHeaders.column4}</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((row, index) => (
            <tr key={index}>
              <td>{row.NIC_number}</td>
              <td>{row.first_name}</td>
              <td>{row.last_name}</td>
              <td>
                {row.is_Admin === 0 ? (
                  <button onClick={() => handlePromote(row.NIC_number)}>
                    Promote
                  </button>
                ) : (
                  "Admin"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminManagementTableComponent;
