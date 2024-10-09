import css from './ImageCard.module.css'
import{Image} from '../../types'

interface ImageCardProps{
    image: Image;
    onClick: (image: Image) => void;  
}
const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => { 

    return (
        <div>
            <img className={css.img} src={image.urls.small} alt={image.alt_description} onClick={() => onClick(image)} />
        </div>
    ) 
};

export default ImageCard;