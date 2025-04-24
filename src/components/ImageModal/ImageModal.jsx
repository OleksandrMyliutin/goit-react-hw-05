import Modal from 'react-modal';
import s from './ImageModal.module.css';
import { NavLink } from 'react-router-dom'
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
      <div className={s.modalContent}>
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
        <NavLink to={"movies/"+movie.id.toString()}>More about film..</NavLink>
      </div>
    </Modal>
  );
};

export default ImageModal;
