import React from 'react';
import './CardTableComponent.css';
import arrowMore from '/AdminPanelHomeImages/arrow-next-small-svgrepo-com.svg';

function CardTableComponent({ data, headers }) {
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

export default CardTableComponent;
