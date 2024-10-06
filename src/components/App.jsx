import { useState, useEffect } from 'react';
import SearchBar from './searchBar/SearchBar';
import ImageGallery from './imageGallery/ImageGallery';
import Loader from './loader/Loader';
import ErrorMessage from './errorMessage/ErrorMessage';
import { Toaster } from 'react-hot-toast';
import LoadMoreBtn from './loadMoreBtn/LoadMoreBtn';
import ImageModal from './imageModal/ImageModal';
import { fetchImagesFromAPI } from './services/fetchImages';
import toast from 'react-hot-toast';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const { results, total_pages } = await fetchImagesFromAPI(query, page);

        if (page === 1) {
          setImages(results);
        } else {
          setImages((prevImages) => [...prevImages, ...results]);
        }

        setShowBtn(total_pages && total_pages !== page);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to fetch images. Please try again later.');
        toast.error('Failed to fetch images. Please try again later.')
      } finally {
        setLoading(false)
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search term.');
      return;
    }
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setModal(image);
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <div>
      <Toaster position="top-right"/>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {showBtn && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      {modal && <ImageModal image={modal} onClose={closeModal} />}
    </div>
  );
}

export default App;