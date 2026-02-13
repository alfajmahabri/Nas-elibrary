import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import './BookViewer.css';

const BookViewer = () => {
  const { id } = useParams();
  const { authToken, isAuthenticated } = useAuth();
  const [pdfUrl, setPdfUrl] = useState('');
  const [bookMetadata, setBookMetadata] = useState(null); // New state for metadata
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let currentObjectUrl = null;
    if (pdfUrl) {
      currentObjectUrl = pdfUrl;
    }

    if (!isAuthenticated) {
      setError("Please log in to view the book.");
      setLoading(false);
      return;
    }

    if (!id) {
      setError("No book ID provided.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      let foundMetadata = null;

      try {
        // 1. Fetch all book metadata
        const metadataResponse = await fetch('/api/files/list', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        if (!metadataResponse.ok) {
          throw new Error(`HTTP error fetching metadata! status: ${metadataResponse.status}`);
        }
        const allMetadata = await metadataResponse.json();
        foundMetadata = allMetadata.find(book => book.id === id);

        if (!foundMetadata) {
          throw new Error("Book metadata not found.");
        }
        setBookMetadata(foundMetadata);

        // 2. Fetch the PDF
        const pdfResponse = await fetch(`/api/files/${id}/view`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        if (!pdfResponse.ok) {
          throw new Error(`HTTP error fetching PDF! status: ${pdfResponse.status}`);
        }

        const pdfBlob = await pdfResponse.blob();
        const newPdfObjectUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(newPdfObjectUrl);

      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (currentObjectUrl) {
        URL.revokeObjectURL(currentObjectUrl);
      }
    };
  }, [id, authToken, isAuthenticated]);


  if (loading) return (
    <>
        <Header />
        <div className="book-viewer-container">Loading book...</div>
    </>
  );
  if (error) return (
    <>
        <Header />
        <div className="book-viewer-container error-message">Error: {error}</div>
    </>
  );
  if (!bookMetadata && !loading) return (
    <>
        <Header />
        <div className="book-viewer-container">Book metadata not found.</div>
    </>
  );
  if (!pdfUrl && !loading) return (
    <>
        <Header />
        <div className="book-viewer-container">PDF content not found.</div>
    </>
  );

  return (
    <>
      <Header />
      <div className="book-viewer-container">
        <h2 className="book-viewer-title">Viewing: {bookMetadata.fileName}</h2>
        <p><strong>Category:</strong> {bookMetadata.category}</p>
        <p><strong>Author:</strong> {bookMetadata.author}</p>
        <p><strong>Description:</strong> {bookMetadata.description}</p>
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          style={{ border: 'none' }}
          title={`Book ${bookMetadata.fileName}`}
        >
          This browser does not support PDFs. Please download the PDF to view it.
          <a href={pdfUrl} download>Download PDF</a>
        </iframe>
      </div>
    </>
  );
};

export default BookViewer;