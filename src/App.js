import './App.css';
import { useEffect, useState } from 'react';

import pics from './db.json';

function App() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9; // Number of pictures per page

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Get the pictures for the current page
  const currentPictures = pics.engagement.slice(startIndex, endIndex);

  const totalPages = Math.ceil(pics.engagement.length / pageSize);

  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    handlePageChange(1);
  }, []);

  return loading ? (
    <span>LOADING . . .</span>
  ) : (
    <div className='App'>
      {currentPictures.map((pic, index) => (
        <img className='onePic' src={pic.path} alt={index} key={index} />
      ))}
      <div className='pagination'>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={currentPage === page ? 'button active' : 'button'}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default App;
