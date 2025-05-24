const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createBook, getBooks, getBookById, searchBooks, createReview } = require('../controllers/book');

router.post('/', auth, createBook);
router.get('/', getBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);

router.post('/:id/reviews', auth, createReview);

module.exports = router;
