import css from './ImageCard.module.css'
const ImageCard = ({ image, onClick }) => { 

    return (
        <div>
            <img className={css.img} src={image.urls.small} alt={image.alt_description} onClick={() => onClick(image)} />
        </div>
    ) 
};

export default ImageCard;