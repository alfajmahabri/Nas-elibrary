import React from 'react';
import Header from '../components/Header';
import BookList from '../components/BookList';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Header />

      <section className="books-section">
        <BookList />
      </section>

      <footer className="footer">
        <p>&copy; 2026 eLibrary. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;