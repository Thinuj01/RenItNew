import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar'; // Import the calendar component
import 'react-calendar/dist/Calendar.css'; // Import default calendar styling
import './ItemPreviewPageDateSelectCalendar.css';
import { useLocation,useNavigate } from 'react-router-dom'


function ItemPreviewPageDateSelectCalendar({fetch=[],cateData=[]}) {
    const [selectedDates, setSelectedDates] = useState([]);
    const navigate = useNavigate();
    const item = fetch.length > 0 ? fetch[0] : {};
    const newCateData =cateData.length>0 ? cateData[0]:{};


    // useEffect(()=>{
    //     console.log("Item",item);
    // });


    // Example of non-available dates (these could be fetched from the database)
    const nonAvailableDates = [
        new Date(2024, 8, 12),
        new Date(2024, 8, 14),
        new Date(2024, 8, 15)
    ];

    // Handle date selection, ensuring only consecutive dates are selected or unselected
    const handleDateChange = (date) => {
        if (nonAvailableDates.some(d => d.getTime() === date.getTime())) {
            alert('This date is not available for booking.');
            return;
        }

        if (selectedDates.some(d => d.getTime() === date.getTime())) {
            // If the date is already selected, unselect it
            const updatedDates = selectedDates.filter(d => d.getTime() !== date.getTime());
            setSelectedDates(updatedDates);
        } else {
            if (selectedDates.length === 0) {
                // Start new selection with the first selected date
                setSelectedDates([date]);
            } else {
                const lastSelectedDate = selectedDates[selectedDates.length - 1];
                const nextDay = new Date(lastSelectedDate);
                nextDay.setDate(lastSelectedDate.getDate() + 1);

                if (date.getTime() === nextDay.getTime()) {
                    // Add date if it is the next consecutive day
                    setSelectedDates([...selectedDates, date]);
                } else {
                    alert('Please select consecutive days only.');
                }
            }
        }
    };

    // Function to highlight selected dates and non-available dates
    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            if (nonAvailableDates.some(d => d.getTime() === date.getTime())) {
                return 'non-available-date'; // Red color for non-available dates
            }
            if (selectedDates.some(d => d.getTime() === date.getTime())) {
                return 'selected-date'; // Green color for selected dates
            }
        }
        return '';
    };

    return (
        <div className="itemPreviewPageDateSelectCalendar">
            <div className="titleAndDesc">
                <div className="calendarTitle">Check & Book earlier</div>
                <div className="calendarDesc">Select days when you want item</div>
            </div>

            <div className="availabilityOrNonAvailability">
                <div className="availabilityOrNonAvailabilityLabel">
                    <div className="availableColorLabelDiv"></div>
                    Available
                </div>
                <div className="availabilityOrNonAvailabilityLabel">
                    <div className="nonAvailableColorLabelDiv"></div>
                    Non-Available
                </div>
            </div>

            <div className="calendarDiv">
                {/* Calendar Component */}
                <Calendar
                    onClickDay={handleDateChange}
                    tileClassName={tileClassName} // Add custom classes for tiles
                    minDate={new Date()} // Prevent selecting past dates
                />

                {/* For displaying selected dates */}
                <div className="selectedDates">
                    <strong>Selected Dates:</strong>
                    {selectedDates.length ? (
                        <ul className="dateList">
                            {selectedDates.map((d, index) => (
                                <li key={index} className="dateItem">{d.toDateString()}</li>
                            ))}
                        </ul>
                    ) : (
                        'None'
                    )}
                </div>


            </div>

            {/* Action buttons */}
            <button className="purchaseButton" onClick={()=>{
                if(selectedDates.length){
                    navigate("/PurchasePage",{state:{fetch:item,selectedDates:selectedDates,cateData:newCateData}});
                }else{
                    alert("Select Prefred Dates");
                }
            }}>Purchase Now</button>
            <button className="wishlistButton">Add to wishlist</button>
        </div>
    );
}

export default ItemPreviewPageDateSelectCalendar;
