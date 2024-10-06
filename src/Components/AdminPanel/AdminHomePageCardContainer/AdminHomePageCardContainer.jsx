import React from 'react';
import './AdminHomePageCardContainer.css'; // Add your styles here
import CardTableComponent from '../CardTableComponent/CardTableComponent';
import arrowMore from '/AdminPanelHomeImages/arrow-next-small-svgrepo-com.svg';
import { Link } from 'react-router-dom';

function AdminHomePageCardContainer({ title, count, data, SvgIcon, headers, cardMenuLink }) {

    return (
        <div className="adminHomePageCardContainer">
            <div className="adminHomeCardTop">
                <div className="adminHomeCardTopLeft">
                    <div className="cardSVG_cardTexts">
                        <div className="cardSVG">
                            <img src={SvgIcon} alt="" className='cardIcon' />
                        </div>
                        <div className="cardTexts">
                            <p>{title}</p>
                            <h1>{count}</h1>
                        </div>
                    </div>
                </div>
                <div className="adminHomeCardTopRight">
                    <div className="cardMoreView">
                        <Link to={cardMenuLink}><img src={arrowMore} alt="" className='cardMoreViewIcon' /></Link>
                    </div>
                </div>
            </div>

            <div className="adminHomeCardBottom">
                <CardTableComponent data={data} headers={headers} page={cardMenuLink} />
            </div>
        </div>
    );
}

export default AdminHomePageCardContainer;
