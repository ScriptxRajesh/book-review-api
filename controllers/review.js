const Review = require('../models/Review');

exports.updateReview = async (req, res) => {
  try  {
     if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        message: 'Request body cannot be empty. Please provide fields to update.' 
      });
    }
     const review = await Review.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!review) {
      return res.status(404).json({ 
        message: 'Review not found' 
      });
    }
    Object.assign(review, req.body);
    await review.save();
    res.status(200).json(review);
  } catch  (error) {
    res.status(500).json({
      message: 'Error updating review',
      error: error.message
    })
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!review) return res.status(404).json({ error: 'Not found' });
  res.status(200).json({ 
      message: 'Review deleted successfully',
      deletedReview: {
        id: review._id,
        book: review.book,
        rating: review.rating
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting review',
      error: error.message
    });
  }
};
