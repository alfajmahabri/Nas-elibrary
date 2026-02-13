import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import './AdminManage.css'; // Will create this CSS file

const AdminManage = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [imageCover, setImageCover] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { authToken, isAdminUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  if (!isAdminUser) {
    navigate('/home'); // Or some unauthorized page
    return null;
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    const fileData = {
      category,
      description,
      author,
      imageCover,
    };
    formData.append('data', JSON.stringify(fileData));

    try {
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          // 'Content-Type': 'multipart/form-data' is NOT set here; browser sets it with boundary
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${errorText}`);
      }

      setMessage('File uploaded successfully!');
      // Clear form
      setCategory('');
      setDescription('');
      setAuthor('');
      setImageCover('');
      setSelectedFile(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Header />
      <div className="admin-manage-container">
        <h2>Upload New Book</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageCover">Image Cover URL:</label>
            <input
              type="text"
              id="imageCover"
              value={imageCover}
              onChange={(e) => setImageCover(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="file">Select File (PDF):</label>
            <input
              type="file"
              id="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit" className="upload-button">Upload Book</button>
        </form>
      </div>
    </>
  );
};

export default AdminManage;