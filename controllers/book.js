const Book = require('../models/Book');
const Review = require('../models/Review');

exports.createBook = async (req, res) => {
  const book = new Book({
    ...req.body,
    createdBy: req.user.id
  });
  try {
    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message})
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const filter = {};
    if (author) filter.author = author;
    if (genre) filter.genre = genre;

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

exports.getBookById = async (req, res) => {
   try {
    const { page = 1, limit = 10 } = req.query;
    
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const reviews = await Review.find({ book: book._id })
      .populate('user', 'username')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 }); 

    const totalReviews = await Review.countDocuments({ book: book._id });
    
    const allReviews = await Review.find({ book: book._id }).select('rating');
    const avgRating = allReviews.length ? 
      (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(2) : 
      null;

    const totalPages = Math.ceil(totalReviews / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.status(200).json({ 
      book, 
      avgRating, 
      reviews,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalReviews,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book details', error: error.message });
  }
};

exports.createReview = async (req, res) => {
   try {
    const existingReview = await Review.findOne({ 
      book: req.params.id, 
      user: req.user.id 
    });

    if (existingReview) {
      return res.status(400).json({ 
        message: 'You have already reviewed this book. Only one review per user per book is allowed.' 
      });
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const review = new Review({
      ...req.body,
      book: req.params.id,
      user: req.user.id
    });

    await review.save();
    
    await review.populate('user', 'username');
    
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error creating review', error: error.message });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error searching books', error: error.message });
  }
};
