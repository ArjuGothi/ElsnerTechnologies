import axiosCall from "../../configurations/network-services/axiosCall";

export const getAllBlogDataAction = () => { 
  const path = `/posts`;
  return axiosCall('get', path, 'GET_LISTS', null, {'Content-type': 'application/json; charset=UTF-8'});
};

export const deleteBlogAction = (id) => { 
  const path = `/posts/${id}`;
  return axiosCall('delete', path, 'DELETE_BLOG', null, {'Content-type': 'application/json; charset=UTF-8'});
};

export const addBlogAction = (data) => { 
  const path = `/posts`;
  return axiosCall('post', path, 'ADD_BLOG', JSON.stringify(data), {'Content-type': 'application/json; charset=UTF-8'});
};

export const editBlogAction = (data) => { 
  const path = `/posts`;
  return axiosCall('put', path, 'EDIT_BLOG', JSON.stringify(data), {'Content-type': 'application/json; charset=UTF-8'});
};

