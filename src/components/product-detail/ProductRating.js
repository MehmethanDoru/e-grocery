import { useState } from 'react';
import { ratingService } from '@/api/supabase/services/ratingService';
import { toast } from 'react-toastify';

const StarRating = ({ rating, interactive = false, size = 5, onHover, onClick }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`${i + 1} star`}
          onMouseEnter={() => interactive && onHover?.(i + 1)}
          onMouseLeave={() => interactive && onHover?.(0)}
          onClick={() => interactive && onClick?.(i + 1)}
          className={interactive ? "transition-transform hover:scale-110" : ""}
        >
          <svg
            className={`w-${size} h-${size} ${
              i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

const RatingModal = ({ isOpen, onClose, onSubmit, isLoading, selectedRating, hoveredRating, onRatingHover, onRatingSelect }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rating-modal-title"
    >
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full mx-4">
        <h3 id="rating-modal-title" className="text-xl font-semibold text-[#064c4f] mb-4">
          Rate the Product
        </h3>
        
        <div className="flex justify-center space-x-2 mb-6">
          <StarRating
            rating={hoveredRating || selectedRating}
            interactive={true}
            size={8}
            onHover={onRatingHover}
            onClick={onRatingSelect}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-[#064c4f] text-white rounded-lg hover:bg-[#053c3e] transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductRating = ({ rating, reviews, productId, onRatingUpdate }) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRatingSubmit = async () => {
    if (selectedRating === 0) {
      toast.error('Please select a star value');
      return;
    }

    if (typeof onRatingUpdate !== 'function') {
      console.error('onRatingUpdate prop is not a function');
      toast.error('An error occurred. Please refresh the page and try again.');
      return;
    }

    setIsLoading(true);
    try {
      await ratingService.updateProductRating(productId, selectedRating, rating, reviews);
      
      const newReviews = reviews + 1;
      const newRating = (((rating * reviews) + selectedRating) / newReviews).toFixed(1);
      
      onRatingUpdate(newRating, newReviews);
      setShowRatingModal(false);
      setSelectedRating(0);
      toast.success('Your rating has been successfully saved!');
    } catch (error) {
      console.error('Error updating rating:', error);
      toast.error('An error occurred while saving the rating. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2 relative">
      <StarRating rating={rating} />
      
      <span className="text-sm md:text-base text-gray-600">
        <span className="text-gray-400">•</span> {reviews} review
      </span>

      <button 
        onClick={() => setShowRatingModal(true)}
        className="ml-2 text-[#064c4f] hover:text-[#053c3e]"
        aria-label="Rate the Product"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </button>

      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onSubmit={handleRatingSubmit}
        isLoading={isLoading}
        selectedRating={selectedRating}
        hoveredRating={hoveredRating}
        onRatingHover={setHoveredRating}
        onRatingSelect={setSelectedRating}
      />
    </div>
  );
};

export default ProductRating;