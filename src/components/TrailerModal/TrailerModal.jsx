import Modal from 'react-modal';
import s from './TrailerModal.module.css';

Modal.setAppElement('#root');

const TrailerModal = ({ isOpen, trailerKey, onClose }) => {
if (!trailerKey) return null;

return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    className={s.modal}
    overlayClassName={s.overlay}
    shouldCloseOnOverlayClick={true}
    >
    <button onClick={onClose} className={s.closeBtn}>×</button>
    <div className={s.videoWrapper}>
        <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${trailerKey}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        />
    </div>
    </Modal>
);
};

export default TrailerModal;
