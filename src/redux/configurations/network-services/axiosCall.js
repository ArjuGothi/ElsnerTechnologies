import axios from 'axios';

const instance = axios.create(
  {
    baseURL: 'https://jsonplaceholder.typicode.com',
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',

    },
  },
);
export default function axiosCall(method, url, responseType, data, headers, payload) {
  return async (dispatch) => {
    const apiData = data ? {
      method, url, data, headers,
    } : { method, url };
    instance(apiData)
      .then((response) => {
        if (response.data) {
          dispatch({ type: `${responseType}_SUCCESS`, updatePayload: response.data, payload });
          return response.data;
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error === 'Authentication token expired') {
          localStorage.clear();
        }
        dispatch({
          type: 'FETCH_ERROR',
          updatePayload: err.response ? err.response : 'Something Went Wrong.',
        });
        return err.response;
      });
  };
}
