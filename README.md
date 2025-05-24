# book-review-api

A RESTful API for a Book Review System built using **Node.js**, **Express.js**, and **MongoDB**. Includes JWT-based authentication and basic CRUD for books and reviews.

## Features

- JWT-based user authentication (`/signup`, `/login`)
- Adding/Modifying books for registered users
- Adding/Modifying/Deleting book reviews for registered users
- Pagination & filtering support
- Search books by title or author

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- dotenv

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ScriptxRajesh/book-review-api.git
   cd book-review-system
   ```

2. Create .env file

   ```bash
   PORT=5000
   MONGODB_URI=your_mongo_atlas_cluster_uri
   JWT_SECRET=your_jwt_secret
   ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the application:
    ```bash
    npm run dev
    ```
The application will be available at http://localhost:5000.



## API Endpoints
1. Register a User:
    ```bash
    curl --location 'http://localhost:5000/api/auth/signup' \
    --header 'Content-Type: application/json' \
    --data '{
      "username": "User5",
      "password": "123456"
    }
    '
    ```
Register a new user by providing a username and password.

2. Login:
    ```bash
    curl --location 'http://localhost:5000/api/auth/login' \
    --header 'Content-Type: application/json' \
    --data '{
      "username": "User5",
      "password": "123456"
    }
    '
    ```

 Authenticate a user and obtain a JWT token for subsequent requests.

3. Add/Modify Book Review:
    ```bash
    curl --location 'http://localhost:5000/api/books/' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzBkMjkzY2M0MDNlZjE1Nzc0ZGQxZSIsImlhdCI6MTc0ODAzMjI4NSwiZXhwIjoxNzQ4MTE4Njg1fQ.LylBcXfwy9Ylf-HFP53boTDKtMoAHzLN1lmNwPFTeDc' \
    --data '{
      "title": "Book6",
      "author": "Cristopher Nolan",
      "genre": "Science"
    }
    '
    ```

 Add a new book (Authenticated users only)

4. Git all books:
    ```bash
    curl --location 'http://localhost:5000/api/books/' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzBkMjkzY2M0MDNlZjE1Nzc0ZGQxZSIsImlhdCI6MTc0ODAzMjI4NSwiZXhwIjoxNzQ4MTE4Njg1fQ.LylBcXfwy9Ylf-HFP53boTDKtMoAHzLN1lmNwPFTeDc'
    ```

    Get all books

5. Get book details by id:
   ```bash
   curl --location 'http://localhost:5000/api/books/683164b203c19c73909df12c' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzBkMjkzY2M0MDNlZjE1Nzc0ZGQxZSIsImlhdCI6MTc0ODAzMjI4NSwiZXhwIjoxNzQ4MTE4Njg1fQ.LylBcXfwy9Ylf-HFP53boTDKtMoAHzLN1lmNwPFTeDc'
   ```

   Get book details by id including average rating & Reviews

6. Submit Review:
   ```bash
   curl --location 'http://localhost:5000/api/books/683164b203c19c73909df12c/reviews' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzBkMjkzY2M0MDNlZjE1Nzc0ZGQxZSIsImlhdCI6MTc0ODAzMjI4NSwiZXhwIjoxNzQ4MTE4Njg1fQ.LylBcXfwy9Ylf-HFP53boTDKtMoAHzLN1lmNwPFTeDc' \
    --data '{
      "rating": 3,
      "comment": "well amazed!"
    }
    '
   ```

   Submit a review (Authenticated users only, one review per user per book)

7. Update your own review:
   ```bash
   curl --location --request PUT 'http://localhost:5000/api/reviews/6830df63e5f5850de957206a' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzBkMjkzY2M0MDNlZjE1Nzc0ZGQxZSIsImlhdCI6MTc0ODAzMjI4NSwiZXhwIjoxNzQ4MTE4Njg1fQ.LylBcXfwy9Ylf-HFP53boTDKtMoAHzLN1lmNwPFTeDc' \
    --data '{
      "rating": 4,
      "comment": "Still a good book, just re-reading."
    }
    '
   ```

   Update your own review by review id


8. Delete your own review:
   ```bash
   curl --location --request DELETE 'http://localhost:5000/api/reviews/6830df63e5f5850de957206a'
   ```

   Delete your own review by review id

9. Search books by title or author:
   ```bash
   curl --location 'http://localhost:5000/api/books/search?query=book'
   ```

   Search books by title or author (partial and case-insensitive)



## Database Schema

User:
  ```bash
  {
    _id: ObjectId,
    username: String,
    password: String (hashed)
  }
  ```


Book:
  ```bash
  {
    _id: ObjectId,
    title: String,
    author: String,
    genre: String,
    createdBy: ObjectId (ref User)
  }
  ```


Review:
  ```bash
  {
    _id: ObjectId,
    book: ObjectId (ref Book),
    user: ObjectId (ref User),
    rating: Number (1-5),
    comment: String,
    createdAt: Date
  }
  ```


## Design Decisions & Assumptions
 - One review per user per book.
 - Basic pagination defaults: page=1, limit=10
 - Reviews are embedded in book details.
 - Passwords are hashed using bcrypt.
 - Error messages are uniform and consistent.

## Author
Puramaneni Rajesh
