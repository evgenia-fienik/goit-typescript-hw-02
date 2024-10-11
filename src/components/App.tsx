import React, { useState, useEffect, Suspense, startTransition } from 'react';
import { Toaster } from 'react-hot-toast';
import { fetchImagesFromAPI } from './services/fetchImages';
import toast from 'react-hot-toast';
import { Image, FetchImagesResponse } from '../types';
import css from './App.module.css';

const SearchBar = React.lazy(()=> import ('./SearchBar/SearchBar')) ;
const ImageGallery = React.lazy(()=> import('./ImageGallery/ImageGallery'));
const Loader = React.lazy(()=> import ('./Loader/Loader')) ;
const ErrorMessage = React.lazy(()=> import ('./ErrorMessage/ErrorMessage'));
const LoadMoreBtn = React.lazy(()=> import('./LoadMoreBtn/LoadMoreBtn'));
const ImageModal = React.lazy(()=> import('./ImageModal/ImageModal'));

function App(){
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [modal, setModal] = useState<Image | null>(null);
  const [showBtn, setShowBtn] = useState<boolean>(false);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const { results, total_pages }: FetchImagesResponse = await fetchImagesFromAPI(query, page);

        if (page === 1) {
          setImages(results);
        } else {
          setImages((prevImages) => [...prevImages, ...results]);
        }

        setShowBtn(total_pages > page);
        // setLoading(false);
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

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search term.');
      return;
    }
    startTransition(() => {
      setQuery(searchQuery);
      setPage(1);
      setImages([]);
      setError(null);
    });
  };

  const handleLoadMore = () => {
    startTransition(() => {
      setPage((prevPage) => prevPage + 1);
    });
  };

  const openModal = (image: Image) => {
    setModal(image);
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <>
      <Toaster position="top-right" />
      <Suspense fallback={<Loader/>}>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {showBtn && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
        {modal && <ImageModal image={modal} onClose={closeModal} />}
        </Suspense>
    </>
  );
}

export default App;