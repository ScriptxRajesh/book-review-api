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
   Register a new user by providing a username and password.
    ```bash
    curl --location 'http://localhost:5000/api/auth/signup' \
    --header 'Content-Type: application/json' \
    --data '{
      "username": "User5",
      "password": "123456"
    }
    '
    ```
    ![image](https://github.com/user-attachments/assets/a4aecf94-d44e-4bb6-a6c5-172cd891df0c)
   
2. Login:
   Authenticate a user and obtain a JWT token for subsequent requests.
    ```bash
    curl --location 'http://localhost:5000/api/auth/login' \
    --header 'Content-Type: application/json' \
    --data '{
      "username": "User5",
      "password": "123456"
    }
    '
    ```
    ![image](https://github.com/user-attachments/assets/14096409-6517-4601-b81e-7f3208c85564)

3. Add/Modify Book Review:
   Add a new book (Authenticated users only)
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
    ![image](https://github.com/user-attachments/assets/8f838561-9f03-407a-a5d9-d0da957af128)



4. Git all books:
   Get all books
    ```bash
    curl --location 'http://localhost:5000/api/books/' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzBkMjkzY2M0MDNlZjE1Nzc0ZGQxZSIsImlhdCI6MTc0ODAzMjI4NSwiZXhwIjoxNzQ4MTE4Njg1fQ.LylBcXfwy9Ylf-HFP53boTDKtMoAHzLN1lmNwPFTeDc'
    ```
    ![image](https://github.com/user-attachments/assets/94e83e21-a6e2-4cf0-aff1-e0a8514588fb)



5. Get book details by id:
   Get book details by id including average rating & Reviews
   ```bash
   curl --location 'http://localhost:5000/api/books/683164b203c19c73909df12c' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzBkMjkzY2M0MDNlZjE1Nzc0ZGQxZSIsImlhdCI6MTc0ODAzMjI4NSwiZXhwIjoxNzQ4MTE4Njg1fQ.LylBcXfwy9Ylf-HFP53boTDKtMoAHzLN1lmNwPFTeDc'
   ```
   ![image](https://github.com/user-attachments/assets/b63faeab-4d1d-4fda-8a02-a1b411cfd1db)


6. Submit Review:
   Submit a review (Authenticated users only, one review per user per book)
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
   ![image](https://github.com/user-attachments/assets/5047b286-4d70-43d3-9e3a-56253750a90d)



7. Update your own review:
    Update your own review by review id
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
   ![image](https://github.com/user-attachments/assets/3f55d67e-3905-4b48-9e75-9449345c3c0e)



8. Delete your own review:
   Delete your own review by review id
   ```bash
   curl --location --request DELETE 'http://localhost:5000/api/reviews/6830df63e5f5850de957206a'
   ```
   ![image](https://github.com/user-attachments/assets/b09c7f0c-8020-47b6-97b9-581b9562cf73)


9. Search books by title or author:
    Search books by title or author (partial and case-insensitive)
   ```bash
   curl --location 'http://localhost:5000/api/books/search?query=book'
   ```
   ![image](https://github.com/user-attachments/assets/77761ef7-8ab2-4b24-9abb-ad2d620846e2)




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
