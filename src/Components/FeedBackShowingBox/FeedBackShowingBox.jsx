import React, { useState } from 'react';
import './FeedBackShowingBox.css';

function FeedBackShowingBox() {
    const itemFeedback = [
        { name: 'Ramesh De Silva', comment: 'Superb product quality!', profilePic: '', rating: 5 },
        { name: 'Ramesh De Silva', comment: 'Good service!', profilePic: '', rating: 4 },
        { name: 'Ramesh De Silva', comment: 'Good service!', profilePic: '', rating: 4 },
        { name: 'Ramesh De Silva', comment: 'Good service!', profilePic: '', rating: 4 },
        { name: 'Ramesh De Silva', comment: 'Good service!', profilePic: '', rating: 4 },
        { name: 'Ramesh De Silva', comment: 'Good service!', profilePic: '', rating: 4 },
        { name: 'Ramesh De Silva', comment: 'Good service!', profilePic: '', rating: 4 },
        { name: 'Ramesh De Silva', comment: 'Good service!', profilePic: '', rating: 4 },
        { name: 'Ramesh De Silva', comment: 'Good service!', profilePic: '', rating: 4 },
        { name: 'Ramesh De Silva', comment: 'Good service!', profilePic: '', rating: 4 },
        { name: 'Ramesh De Silva', comment: 'Good service!', profilePic: '', rating: 4 },
        { name: 'Ramesh De Silva', comment: 'Good service!', profilePic: '', rating: 4 },
        { name: 'Ramesh De Silva', comment: 'Good service!', profilePic: '', rating: 4 },
        { name: 'Ramesh De Silva', comment: 'Good service!', profilePic: '', rating: 4 },
        //... other feedback
    ];

    const sellerFeedback = [
        { name: 'Kamal De Silva', comment: 'Great communication!', profilePic: '', rating: 5 },
        { name: 'Kamal De Silva', comment: 'Great communication!', profilePic: '', rating: 5 },
        { name: 'Kamal De Silva', comment: 'Great communication!', profilePic: '', rating: 5 },
        { name: 'Kamal De Silva', comment: 'Great communication!', profilePic: '', rating: 5 },
        { name: 'Kamal De Silva', comment: 'Great communication!', profilePic: '', rating: 5 },
        { name: 'Kamal De Silva', comment: 'Friendly seller!', profilePic: '', rating: 4 },
        { name: 'Kamal De Silva', comment: 'Friendly seller!', profilePic: '', rating: 4 },
        { name: 'Kamal De Silva', comment: 'Friendly seller!', profilePic: '', rating: 4 },
        { name: 'Kamal De Silva', comment: 'Friendly seller!', profilePic: '', rating: 4 },
        { name: 'Kamal De Silva', comment: 'Friendly seller!', profilePic: '', rating: 4 },
        { name: 'Kamal De Silva', comment: 'Friendly seller!', profilePic: '', rating: 4 },
        //... other feedback
    ];

    const [activeTab, setActiveTab] = useState('itemFeedback'); // Default to Item Feedback
    const [currentPage, setCurrentPage] = useState(1);
    const feedbackPerPage = 5;

    // Get the correct feedback to display based on the tab and page
    const feedbackToShow = activeTab === 'itemFeedback' ? itemFeedback : sellerFeedback;
    const totalPages = Math.ceil(feedbackToShow.length / feedbackPerPage);
    const currentFeedback = feedbackToShow.slice((currentPage - 1) * feedbackPerPage, currentPage * feedbackPerPage);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1); // Reset to first page when changing tabs
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    // Calculate the average rating for the current feedback
    const calculateAverageRating = (feedbackArray) => {
        const totalRating = feedbackArray.reduce((sum, feedback) => sum + feedback.rating, 0);
        return (totalRating / feedbackArray.length).toFixed(1);
    };

    // Calculate total ratings and average rating for the active tab
    const totalUsersRated = feedbackToShow.length;
    const averageRating = calculateAverageRating(feedbackToShow);

    return (
        <>
            <div className="feedback-container">
                {/* Toggle Tabs */}
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

                {/* Rating Section */}
                <div className="rating-section">
                    <div className="rating-section-left">
                        <div className="stars">
                            ★★★★☆ {/* Placeholder or you can dynamically calculate stars */}
                        </div>
                        <div className="total-users">{totalUsersRated} Users were rated</div>
                    </div>
                    <div className="rating-section-right">
                        <div className="rating-number">{averageRating}</div>
                    </div>
                </div>

                {/* Feedback Comments */}
                <div className="feedback-comments">
                    {currentFeedback.map((feedback, index) => (
                        <div key={index} className="feedback-comment">
                            <div className="profile-pic">
                                {feedback.profilePic ? (
                                    <img src={feedback.profilePic} alt="Profile" />
                                ) : (
                                    <div className="placeholder-pic">P</div> // Placeholder for profile pic
                                )}
                            </div>
                            <div className="feedback-content">
                                <div className="user-name">{feedback.name}</div>
                                <div className="user-comment">{feedback.comment}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
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
        </>
    );
}

export default FeedBackShowingBox;
