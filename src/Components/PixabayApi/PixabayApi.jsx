import axios from 'axios';
import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22641637-7351131587a9af45879174884';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getImages = ({ q, page = 1 }) => {
  return axios.get('', { params: { q, page } }).then(res => res.data.hits);
};

getImages.propTypes = {
  searchQuery: PropTypes.string,
  page: PropTypes.number,
};
