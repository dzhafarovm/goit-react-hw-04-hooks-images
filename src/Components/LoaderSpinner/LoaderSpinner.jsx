import Loader from 'react-loader-spinner';
import css from './LoaderSpinner.module.css';

export const LoaderSpinner = () => {
  return (
    <div className={css.spinnerBox}>
      <Loader type="ThreeDots" color="#3f51b5" height={100} width={100} />
      />
    </div>
  );
};
