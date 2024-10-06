import React from 'react';
import { Link } from 'react-router-dom';
import './CardTableComponent.css';
import arrowMore from '/AdminPanelHomeImages/arrow-next-small-svgrepo-com.svg';

function CardTableComponent({ data, headers, page }) {
    console.log(data);
    let popup = '';
    if(page === '/AdminPanelUserApprovalPage'){
        popup = '/AdminPanelUserApprovalPage?district=';
    } else if (page === '/AdminPanelItemApprovalPage'){
        popup = '/AdminPanelItemApprovalPage?district=';
    } else {
        popup = page;
    }
    return (
        <div className="tableContainer">
            <table className="districtTable">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th> // Render each header from props
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.district}</td>
                            <td>{item.requests}</td>
                            <td>
                                <div className="tableMoreView">
                                <Link to={popup+item.district}><img src={arrowMore} alt="" className='tableMoreViewIcon' /></Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CardTableComponent;
