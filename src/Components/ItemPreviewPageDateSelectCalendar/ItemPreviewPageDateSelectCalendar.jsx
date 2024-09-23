import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ItemPreviewPageDateSelectCalendar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ItemPreviewPageDateSelectCalendar({ fetch = [], cateData = [], details = [], userDetails = [] }) {
    const [selectedDates, setSelectedDates] = useState([]);
    const [nonAvailableDates, setNonAvailableDates] = useState([]); // State to store non-available dates from API
    const navigate = useNavigate();
    const item = fetch.length > 0 ? fetch[0] : {};
    const newCateData = cateData.length > 0 ? cateData[0] : {};

    // Function to generate a list of dates between two dates
    const getDatesInRange = (startDate, endDate) => {
        const date = new Date(startDate);
        const dates = [];

        while (date <= new Date(endDate)) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return dates;
    };

    useEffect(() => {
        console.log("Item", item);

        // Fetch the non-available dates from the API
        axios.get('http://localhost:4433/RentIT/Controllers/getItemReserveDetails.php', {
            params: {
                status: "1",
                item_id: item.item_id
            }
        })
        .then(response => {
            console.log("CalendarDates", response.data);

            // Flatten the ranges of unavailable dates into individual dates
            const fetchedNonAvailableDates = response.data.flatMap(range => 
                getDatesInRange(new Date(range.pickup_date), new Date(range.return_date))
            );

            setNonAvailableDates(fetchedNonAvailableDates); // Set the non-available dates
        })
        .catch(error => {
            console.error(error);
        });
    }, [item]);

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
            <button className="purchaseButton" onClick={() => {
                if (selectedDates.length) {
                    navigate("/PurchasePage", { state: { fetch: item, selectedDates: selectedDates, cateData: newCateData, details: details, userDetails: userDetails } });
                } else {
                    alert("Select Preferred Dates");
                }
            }}>Purchase Now</button>
            <button className="wishlistButton">Add to wishlist</button>
        </div>
    );
}

export default ItemPreviewPageDateSelectCalendar;
