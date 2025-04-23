import Modal from 'react-modal';
import s from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, movie, onClose }) => {
  if (!movie) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={s.modal}
      overlayClassName={s.overlay}
      shouldCloseOnOverlayClick={true}
    >
      <button onClick={onClose} className={s.closeBtn}>×</button>

      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={s.poster}
        />
      )}

      <h2>{movie.title || 'No title'}</h2>
      <p><strong>Rating:</strong> {movie.vote_average ?? 'N/A'}</p>
      <p>{movie.overview || 'No overview available'}</p>
    </Modal>
  );
};

export default ImageModal;
