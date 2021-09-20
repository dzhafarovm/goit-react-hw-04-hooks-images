import { useState, useEffect } from 'react';
import { getImages } from './Components/PixabayApi/PixabayApi.jsx';
import { Searchbar } from './Components/Searchbar/Searchbar.jsx';
import { ImageGallery } from './Components/ImageGallery/ImageGallery.jsx';
import { Button } from './Components/Button/Button.jsx';
import { Modal } from './Components/Modal/Modal.jsx';
import { LoaderSpinner } from './Components/LoaderSpinner/LoaderSpinner.jsx';
import css from './App.module.css';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [arrImages, setArrImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // --> Запрос и рендер изображений
  useEffect(() => {
    const fetchImages = () => {
      const q = searchQuery;
      const optionsApi = { q, page };

      if (q.trim() === '') {
        return;
      }

      setError(false);
      setLoading(true);

      getImages(optionsApi)
        .then(arrIm => {
          if (arrIm.length > 0) {
            setArrImages(s => [...s, ...arrIm]);
            scrollTo();
          } else {
            setError(true);
          }
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    };

    fetchImages();
  }, [searchQuery, page]);

  // --> Выбор src для модального окна
  const handleSelectImage = largeImage => setSelectedImage(largeImage);

  // --> Закрытие модалки
  const closeModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      setSelectedImage(null);
    }
  };

  // --> Скролл (GoIT)
  const scrollTo = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  // --> Следующая страница
  const nextPage = () => {
    setPage(s => s + 1);
  };

  // --> Сброс параметров для нового запроса
  const updateQuery = query => {
    setSearchQuery(query);
    setPage(1);
    setArrImages([]);
  };

  const showLoadMoreButton = arrImages.length > 0 && !loading;

  return (
    <div className={css.App}>
      <Searchbar onSubmit={updateQuery} />

      {error && (
        <h2 className={css.ErrorTitle}>
          Search result '{searchQuery}' not found!
        </h2>
      )}

      <ImageGallery
        images={arrImages}
        query={searchQuery}
        onSelect={handleSelectImage}
      />

      {loading && <LoaderSpinner />}

      {showLoadMoreButton && <Button onClick={nextPage} />}

      {selectedImage && (
        <Modal
          largeImage={selectedImage}
          alt={searchQuery}
          onClose={closeModal}
        />
      )}
    </div>
  );
};
