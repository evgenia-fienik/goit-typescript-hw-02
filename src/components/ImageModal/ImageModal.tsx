import Modal from 'react-modal';
import { Image } from '../../types';
import css from './ImageModal.module.css';

interface ImageModalProps {
  image: Image | null;
  onClose: () => void; 
}

Modal.setAppElement('#root')


const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  if (!image) return null;
    const { urls, alt_description, user, likes, description } = image;

      return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
      shouldCloseOnOverlayClick={true} 
    >
      <div className={css.content}>
        <img src={urls.regular} alt={alt_description} className={css.img} />
        <p className={css.p}><strong>Author:</strong> {user.name}</p>
        <p  className={css.p}><strong>likes:</strong> {likes}</p>
        {description && <p  className={css.p}><strong>Description:</strong> {description}</p>}
        <button onClick={onClose} className={css.btn}>Close</button>
      </div>
    </Modal>
  );
};

export default ImageModal;