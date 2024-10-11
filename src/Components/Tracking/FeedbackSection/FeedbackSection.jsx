import React, { useState } from 'react';
import './FeedbackSection.css';
import axios from 'axios';
import CaseOpenPopupWindow from '../CaseOpenPopupWindow/CaseOpenPopupWindow';

const FeedbackSection = ({ title, action, completedStep, reserve_id, titleCase, categoryOptions, label1, label2, data }) => { // Add action prop here
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleHover = (rate) => {
        setHoverRating(rate);
    };

    const handleSubmit = async () => {
        if (rating > 0 && feedback !== '') {
            axios.get('http://localhost:80/RentIT/Controllers/feedbackController.php', {
                params: {
                    status: "3",
                    title: title,
                    reserve_id: reserve_id,
                    feedback: feedback,
                    rating: rating
                }
            })
                .then(response => {
                    console.log("Rate", response.data);
                    setRating(0);
                    setFeedback("");
                })
                .catch(err => {
                    console.error(err);
                })



        } else {
            alert('Please provide a rating and feedback');
        }
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <div className="feedback-container">
            <div className="rating-section">
                <div className="star_title">
                    <div className="feedbackTitle">
                        <h2>{title}</h2>
                    </div>

                    {/* Star Rating */}
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={star <= (hoverRating || rating) ? "filled-star" : "empty-star"}
                                onClick={() => handleRating(star)}
                                onMouseEnter={() => handleHover(star)}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>

                {/* Show Rating Value */}
                <div className="rating-value">{rating > 0 ? rating.toFixed(1) : 0}</div>
            </div>

            {/* Feedback Textbox */}
            <textarea
                placeholder="Enter some Feedback here"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="feedbackTextarea"
            />

            {/* Submit Button */}
            <div className="submit-button-div">
                <button className="case-button" onClick={togglePopup} >
                    Open Case
                </button>

                <button onClick={handleSubmit} className="submit-button" disabled={title === "Rate Item" || title === "Rate Seller" ? completedStep < 9 : completedStep < 8}>
                    Submit
                </button>
            </div>

            <CaseOpenPopupWindow
                isOpen={isPopupOpen}
                onClose={togglePopup}
                title={titleCase}
                categoryOptions={categoryOptions}
                label1={label1}
                label2={label2}
                caseData={data}
            />
        </div>
    );
};

export default FeedbackSection;


// <?php
// header('Content-Type: application/json');

// // Check if data is received via POST
// if ($_SERVER['REQUEST_METHOD'] == 'POST') {
//     // Get the rating and feedback values from the request
//     $rating = $_POST['rating'] ?? null;
//     $feedback = $_POST['feedback'] ?? null;

//     // Check if both values are provided
//     if (!empty($rating) && !empty($feedback)) {
//         // Database connection (assuming you have a database set up)
//         $servername = "localhost";
//         $username = "root";  // Replace with your DB username
//         $password = "";  // Replace with your DB password
//         $dbname = "feedback_db";  // Replace with your DB name

//         // Create connection
//         $conn = new mysqli($servername, $username, $password, $dbname);

//         // Check connection
//         if ($conn->connect_error) {
//             die(json_encode(['error' => 'Database connection failed']));
//         }

//         // Prepare and bind statement to prevent SQL injection
//         $stmt = $conn->prepare("INSERT INTO feedback (rating, feedback) VALUES (?, ?)");
//         $stmt->bind_param("ds", $rating, $feedback); // "d" for double (rating), "s" for string (feedback)

//         // Execute the statement
//         if ($stmt->execute()) {
//             echo json_encode(['message' => 'Feedback submitted successfully!']);
//         } else {
//             echo json_encode(['error' => 'Failed to submit feedback']);
//         }

//         // Close connections
//         $stmt->close();
//         $conn->close();
//     } else {
//         echo json_encode(['error' => 'Invalid input']);
//     }
// } else {
//     echo json_encode(['error' => 'Invalid request method']);
// }











// Sample Database


// CREATE DATABASE feedback_db;

// USE feedback_db;

// CREATE TABLE feedback (
//     id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//     rating DOUBLE NOT NULL,
//     feedback TEXT NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
