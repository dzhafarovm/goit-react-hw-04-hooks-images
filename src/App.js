import { Component } from 'react';
import { getImages } from './Components/PixabayApi/PixabayApi.jsx';
import { Searchbar } from './Components/Searchbar/Searchbar.jsx';
import { ImageGallery } from './Components/ImageGallery/ImageGallery.jsx';
import { Button } from './Components/Button/Button.jsx';
import { Modal } from './Components/Modal/Modal.jsx';
import { LoaderSpinner } from './Components/LoaderSpinner/LoaderSpinner.jsx';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchQuery: '',
    selectedImage: null,
    page: 1,
    arrImages: [],
    loading: false,
    error: false,
  };

  // --> Запрос при обновлении компонента
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
      this.scrollTo();
    }
  }

  nextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  // --> Запрос и рендер изображений
  fetchImages = () => {
    const { searchQuery, page } = this.state;
    const q = searchQuery;
    const optionsApi = { q, page };

    this.setState(prevState => ({
      loading: true,
      error: false,
    }));

    getImages(optionsApi)
      .then(arrImages => {
        if (arrImages.length > 0) {
          this.setState(prevState => ({
            arrImages: [...prevState.arrImages, ...arrImages],
          }));
        } else {
          this.setState({ error: true });
        }
      })
      .catch(() => this.setState({ error: true }))
      .finally(() => this.setState({ loading: false }));
  };

  // --> Выбор src для модального окна
  handleSelectImage = largeImage =>
    this.setState({ selectedImage: largeImage });

  // --> Закрытие модалки
  closeModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      this.setState({
        selectedImage: null,
      });
    }
  };

  // --> Скролл (GoIT)
  scrollTo = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  // --> Сброс параметров для нового запроса
  updateQuery = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      arrImages: [],
    });
  };

  render() {
    const { searchQuery, arrImages, loading, selectedImage, error } =
      this.state;

    const showLoadMoreButton = arrImages.length > 0 && !loading;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.updateQuery} />

        {error && (
          <h2 className={css.ErrorTitle}>
            Search result '{searchQuery}' not found!
          </h2>
        )}

        {loading && <LoaderSpinner />}

        <ImageGallery
          images={this.state.arrImages}
          query={this.state.searchQuery}
          onSelect={this.handleSelectImage}
        />

        {showLoadMoreButton && <Button onClick={this.nextPage} />}

        {selectedImage && (
          <Modal
            largeImage={selectedImage}
            alt={searchQuery}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}
