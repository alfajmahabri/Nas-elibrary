import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import './BookList.css';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken, isAuthenticated } = useAuth(); // Get authToken and isAuthenticated

  useEffect(() => {
    if (!isAuthenticated) {
        // If not authenticated, do not fetch books
        setLoading(false);
        return;
    }

    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/files/list', { // Using relative path for proxy
          headers: {
            'Authorization': `Bearer ${authToken}`, // Include the bearer token
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [authToken, isAuthenticated]); // Rerun effect if token or auth status changes

  if (!isAuthenticated) return <div>Please log in to view books.</div>; // Message if not authenticated
  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="book-list-container">
      <h2>Available Books</h2>
      <div className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;