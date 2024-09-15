import React, { useState } from 'react';
import './FeedbackSection.css'

function FeedbackSection({ itemFeedback, sellerFeedback, itemRating, sellerRating }) {
  const [activeTab, setActiveTab] = useState('item');
  const [currentPage, setCurrentPage] = useState(1);
  const feedbackPerPage = 5;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when tab changes
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderFeedback = (feedback) => {
    const startIndex = (currentPage - 1) * feedbackPerPage;
    const selectedFeedback = feedback.slice(startIndex, startIndex + feedbackPerPage);

    return (
      <>
        {selectedFeedback.map((item, index) => (
          <div key={index} className="feedback-item">
            <h4>{item.user}</h4>
            <p>{item.comment}</p>
          </div>
        ))}
        <div className="pagination">
          {Array.from({ length: Math.ceil(feedback.length / feedbackPerPage) }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => handlePageClick(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="feedback-section">
      <div className="tab-bar">
        <div
          className={`tab ${activeTab === 'item' ? 'active' : ''}`}
          onClick={() => handleTabClick('item')}
        >
          Item Feedback
        </div>
        <div
          className={`tab ${activeTab === 'seller' ? 'active' : ''}`}
          onClick={() => handleTabClick('seller')}
        >
          Seller Feedback
        </div>
      </div>

      <div className="rating-section">
        {activeTab === 'item' && (
          <>
            <p>Item Rating: {itemRating}</p>
            {renderFeedback(itemFeedback)}
          </>
        )}
        {activeTab === 'seller' && (
          <>
            <p>Seller Rating: {sellerRating}</p>
            {renderFeedback(sellerFeedback)}
          </>
        )}
      </div>
    </div>
  );
}

export default FeedbackSection;
