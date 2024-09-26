import React, { useEffect, useState } from 'react';
import './FeedBackShowingBox.css';
import axios from 'axios';

function FeedBackShowingBox({ fetch = [] }) {
    const item = fetch.length > 0 ? fetch[0] : {};

    const [feedbacks, setFeedbacks] = useState([]);
    const [usernames, setUsernames] = useState({}); // To store the usernames by NIC

    useEffect(() => {
        console.log("item", item);

        // Fetch feedbacks based on item_id
        axios.get('http://localhost:4433/RentIT/Controllers/feedbackController.php', {
            params: {
                status: "1",
                item_id: item.item_id
            }
        })
        .then(response => {
            console.log("feedback", response.data);
            setFeedbacks(response.data);
        }).catch(err => {
            console.error(err);
        });
    }, [item]);

    useEffect(() => {
        // Fetch usernames for all NICs once feedback is loaded
        if (feedbacks.length > 0) {
            const NICs = feedbacks.map(feedback => feedback.NIC_number);
            const fetchUsernames = async () => {
                const usernameMap = {};
                await Promise.all(NICs.map(NIC => {
                    return axios.get('http://localhost:4433/RentIT/Controllers/getUserDetailsController.php', {
                        params: {
                            status: "1",
                            nic: NIC
                        }
                    }).then(response => {
                        const FullName = response.data[0].first_name + " " + response.data[0].last_name;
                        usernameMap[NIC] = FullName;
                    }).catch(err => {
                        console.error(err);
                        usernameMap[NIC] = 'Anonymous';
                    });
                }));
                setUsernames(usernameMap);
            };
            fetchUsernames();
        }
    }, [feedbacks]);

    const itemFeedback = feedbacks.length > 0 ? (
        feedbacks.map((feedback) => ({
            name: usernames[feedback.NIC_number] || 'Anonymous',
            comment: feedback.feedback || 'No comment provided',
            profilePic: '', // Assuming you will add a profile picture later
            rating: feedback.rating || 0
        }))
    ) : [];

    const sellerFeedback = [
        { name: 'Kamal De Silva', comment: 'Great communication!', profilePic: '', rating: 5 },
        { name: 'Kamal De Silva', comment: 'Friendly seller!', profilePic: '', rating: 4 },
        // ... more feedback
    ];

    const [activeTab, setActiveTab] = useState('itemFeedback');
    const [currentPage, setCurrentPage] = useState(1);
    const feedbackPerPage = 5;

    const feedbackToShow = activeTab === 'itemFeedback' ? itemFeedback : sellerFeedback;
    const totalPages = Math.ceil(feedbackToShow.length / feedbackPerPage);
    const currentFeedback = feedbackToShow.slice((currentPage - 1) * feedbackPerPage, currentPage * feedbackPerPage);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const calculateAverageRating = (feedbackArray) => {
        const totalRating = feedbackArray.reduce((sum, feedback) => sum + feedback.rating, 0);
        return (totalRating / feedbackArray.length).toFixed(1);
    };

    const totalUsersRated = feedbackToShow.length;
    const averageRating = calculateAverageRating(feedbackToShow);

    return (
        <div className="feedback-container">
            <div className="feedback-tabs">
                <div
                    className={`tab ${activeTab === 'itemFeedback' ? 'active' : ''}`}
                    onClick={() => handleTabClick('itemFeedback')}
                >
                    Item Feedback
                </div>
                <div
                    className={`tab ${activeTab === 'sellerFeedback' ? 'active' : ''}`}
                    onClick={() => handleTabClick('sellerFeedback')}
                >
                    Seller Feedback
                </div>
            </div>

            <div className="rating-section">
                <div className="rating-section-left">
                    <div className="stars">★★★★☆</div>
                    <div className="total-users">{totalUsersRated} Users were rated</div>
                </div>
                <div className="rating-section-right">
                    <div className="rating-number">{averageRating}</div>
                </div>
            </div>

            <div className="feedback-comments">
                {currentFeedback.map((feedback, index) => (
                    <div key={index} className="feedback-comment">
                        <div className="profile-pic">
                            {feedback.profilePic ? (
                                <img src={feedback.profilePic} alt="Profile" />
                            ) : (
                                <div className="placeholder-pic">P</div>
                            )}
                        </div>
                        <div className="feedback-content">
                            <div className="user-name">{feedback.name}</div>
                            <div className="user-comment">{feedback.comment}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                {[...Array(totalPages)].map((_, i) => (
                    <div
                        key={i}
                        className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
                        onClick={() => handlePageClick(i + 1)}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FeedBackShowingBox;
