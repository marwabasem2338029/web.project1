 
// src/pages/MainPage.jsx

// 1. استيراد الـ Hooks اللازمة
import React, { useState, useMemo } from 'react';
import MOCK_BOOKS from '../data/MockProducts';

// دالة الفرز المساعدة (Helper Function)
const sortBooks = (books, sortType) => {
  const sorted = [...books];
  
  // منطق الفرز
  if (sortType === 'year-asc') {
    sorted.sort((a, b) => a.year - b.year);
  } else if (sortType === 'year-desc') {
    sorted.sort((a, b) => b.year - a.year);
  } else if (sortType === 'title-asc') {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  }
  
  return sorted;
};

function MainPage() {
  // 2. حالات التحكم في الفلترة والفرز
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortType, setSortType] = useState('default');

  // 3. تطبيق الفلترة على الكتب
  const filteredBooks = useMemo(() => {
    let currentBooks = MOCK_BOOKS;

    // تطبيق الفلترة حسب المجال (Genre)
    if (selectedGenre !== 'all') {
      currentBooks = currentBooks.filter(book => book.genre === selectedGenre);
    }

    // تطبيق الفرز
    return sortBooks(currentBooks, sortType);

  }, [selectedGenre, sortType]); // عند تغير أي من هذين المتغيرين، يتم تحديث القائمة

  // 4. دالة لمعالجة اختيار الفلترة
  const handleFilterChange = (event) => {
    setSelectedGenre(event.target.value);
  };
  
  // 5. دالة لمعالجة اختيار الفرز
  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  return (
    <div className="main-page">
      
      {/* أدوات التحكم بالفلترة والفرز */}
      <div className="filter-controls">
        
        {/* 1. قائمة الفرز (Sorting) - ربطها بالـ State */}
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

        {/* 2. قائمة الفلترة (Filtering by Genre) - ربطها بالـ State */}
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
      
      {/* عرض الكتب المفلترة والمفرزة */}
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