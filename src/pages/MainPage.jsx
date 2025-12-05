// src/pages/MainPage.jsx

import React, { useState, useMemo } from 'react';
import MOCK_BOOKS from '../data/MockProducts';

//sort function:to apply sorting function outside main
const sortBooks = (books, sortType) => {
  const sorted = [...books];
  
  if (sortType === 'year-asc') {
    //Sorted By Year: Oldest to Newest
    sorted.sort((a, b) => a.year - b.year);
  } else if (sortType === 'year-desc') {
    //Sorted By Year: Newest to Oldest
    sorted.sort((a, b) => b.year - a.year);
  } else if (sortType === 'title-asc') {
    // Sorted By Litle: [A-Z]
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  }
  
  return sorted;
};

function MainPage() {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortType, setSortType] = useState('default');
  const [searchTerm, setSearchTerm] = useState(''); 
  //useMemo
  const filteredBooks = useMemo(() => {
    let currentBooks = MOCK_BOOKS;

    // Filter by genre
    if (selectedGenre !== 'all') {
      currentBooks = currentBooks.filter(book => book.genre === selectedGenre);
    }

    // Filter by SEARCH
    if (searchTerm.trim() !== "") {
      currentBooks = currentBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting to the filtered list
    return sortBooks(currentBooks, sortType);

  }, [selectedGenre, sortType, searchTerm]);

  const handleFilterChange = (event) => {
    setSelectedGenre(event.target.value);
  };
  
  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  return (
    <div className="main-page">

      <div className="filter-controls">

        {/*SEARCH BAR */}
        <div className="control-group">
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="control-group">
          <label htmlFor="sort-by">Sort By:</label>
          <select 
            id="sort-by" 
            name="sort-by" 
            value={sortType} 
            onChange={handleSortChange} 
          >
            <option value="default">Default Order</option>
            <option value="year-asc">Year (Oldest First)</option>
            <option value="year-desc">Year (Newest First)</option>
            <option value="title-asc">Title (A-Z)</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="filter-genre">Filter By Genre:</label>
          <select 
            id="filter-genre" 
            name="filter-genre" 
            value={selectedGenre} 
            onChange={handleFilterChange} 
          >
            <option value="all">All Genres</option>
            <option value="Programming">Programming</option>
            <option value="Classics">Classics</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Philosophy">Philosophy</option>
            <option value="Psychology">Psychology</option>
          </select>
        </div>

      </div>

      <h2>Available Books ({filteredBooks.length} items found)</h2>

      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} className="book-cover" />
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre} | Year: {book.year}</p>
            </div>
          ))
        ) : (
          <p>No books found matching your criteria.</p>
        )}
      </div>

    </div>
  );
}

export default MainPage;