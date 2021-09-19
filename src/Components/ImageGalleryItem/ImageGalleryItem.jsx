import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, alt, onSelect, largeImage }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={image}
        alt={alt}
        className={css.ItemImage}
        onClick={() => onSelect(largeImage)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
