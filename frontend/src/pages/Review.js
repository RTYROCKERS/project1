import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';  
import { handleError } from '../utils';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Review.css';


function Review() {
    const [review, setReview] = useState({ reviews: '' });
    const [comments, setComments] = useState([]); 
    const [loggedInUser,setLoggedInUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    
    useEffect(() => {
        const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
        setComments(storedComments.slice(0, 5)); 
    }, []); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const handleReview = (e) => {
        e.preventDefault();
        const { reviews } = review;

        if (!reviews) {
            handleError('Review cannot be empty');
            return;
        }

        if (!loggedInUser) {
            handleError('You must be logged in to submit a review');
            setTimeout(() => {
                navigate(0);
            }, 2000);
            return;
        }

        try {
            const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
            const newReview = {
                user: loggedInUser,
                comment: reviews,
                timestamp: new Date().toISOString(),
            };

            storedComments.unshift(newReview);
            if (storedComments.length > 7) {
                storedComments.pop();
            }

            
            localStorage.setItem('comments', JSON.stringify(storedComments));
            setComments(storedComments.slice(0, 7)); 
            setReview({ reviews: '' });

            
            toast.success('Review submitted successfully', {
                autoClose: 3000,  
                position: "top-center",
                onClose: () => {
                    
                    toast.dismiss();
                }
            });

            
            toast.clearWaitingQueue();
            navigate(0);

        } catch (err) {
            handleError('Failed to submit review');
            toast.error('Failed to submit review', {
                autoClose: 3000, 
                position: "top-center",
                onClose: () => {
                    toast.dismiss();
                }
            });
        }
    };

    return (
        <div className="container-review">
            <h1 className='review-title'>Reviews</h1>

            <form onSubmit={handleReview}>
                <div className='new-review'>
                    <label className='new-review-label' htmlFor="reviews">Please express your thoughts</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="reviews"
                        placeholder="Enter your review..."
                        value={review.reviews}
                        required
                        className='form-input'
                    />
                </div>
                <button className='submit-btn' type="submit">Send</button>
            </form>

            {/* Display Last 5 Reviews */}
            <div>
                <h2 className='review-title'>Previous Reviews</h2>
                <ul>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <React.Fragment key={index}>
                                <div className="review-card">
                                    <strong>{comment.user}</strong>: {comment.comment}
                                    <br />
                                    <em>{new Date(comment.timestamp).toLocaleString()}</em>
                                </div>
                                {index < comments.length - 1 && <div className="review-divider"></div>}
                            </React.Fragment>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </ul>
            </div>

            <span className='dirc-to-home'>
                Return to
                <Link to="/home"> Home</Link>
            </span>

            <ToastContainer
                position="top-center"
                autoClose={3000}  
                hideProgressBar={true}
                closeOnClick
                pauseOnHover
                newestOnTop
            />
        </div>
    );
}

export default Review;
