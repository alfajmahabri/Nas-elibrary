import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './BookCard.css';

const BookCard = ({ book }) => {
  return (
    <Link to={`/book/${book.id}`} className="book-card-link"> {/* Wrap with Link */}
      <div className="book-card">
        <img src={book.imageCover} alt={book.fileName} className="book-thumbnail" />
        <h3 className="book-title">{book.fileName}</h3>
        <p className="book-author">{book.author}</p>
      </div>
    </Link>
  );
};

export default BookCard;