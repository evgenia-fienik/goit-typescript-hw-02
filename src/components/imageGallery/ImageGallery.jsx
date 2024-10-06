import ImageCard from "../imageCard/ImageCard";
import css from './ImageGallery.module.css'

const ImageGallery = ({ images, onImageClick }) => {
    return (
        <ul className={css.ul}>
            {images.map((image) => (
                <li key={image.id}>
                    <ImageCard image={image} onClick={()=>onImageClick(image)} />
                </li>
            ))}
	
        </ul>
    );
 };

export default ImageGallery;


