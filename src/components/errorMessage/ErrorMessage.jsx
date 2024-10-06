import css from './ErrorMessage.module.css';
import PropTypes from 'prop-types'

const ErrorMessage = ({ message }) => {
  return (<div className={css.error}>{message}</div>
  );
};

ErrorMessage.propTypes = { message: PropTypes.string.isRequired, };

export default ErrorMessage;