import { LineWave } from "react-loader-spinner";
import css from './Loader.module.css';

const Loader = () => {
    return (
        <div className={css.div}>
            <LineWave color="#4fa94d" height={100}
                width={100} />
        </div>
    );
};

export default Loader;