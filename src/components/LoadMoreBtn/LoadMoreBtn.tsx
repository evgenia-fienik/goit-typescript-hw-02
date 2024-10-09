import css from './LoadMoreBtn.module.css'

interface LoadMoreBtnProps{
  onClick: () => void;
} 
const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
  <div className={css.div}>
    <button className={css.btn} onClick={onClick}>Load more</button>
  </div>
  );
};

export default LoadMoreBtn;