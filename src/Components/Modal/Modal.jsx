import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, largeImage, alt }) => {
  const closeEscape = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose(e);
      }
    },
    [onClose],
  );

  useEffect(() => {
    window.addEventListener('keydown', closeEscape);
  }, [closeEscape]);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', closeEscape);
    };
  }, [closeEscape]);

  return createPortal(
    <div className={css.Overlay} onClick={onClose}>
      <div className={css.Modal}>
        <img src={largeImage} alt={alt} />
      </div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
