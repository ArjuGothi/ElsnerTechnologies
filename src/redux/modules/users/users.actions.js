import axiosCall from "../../configurations/network-services/axiosCall";

export const getAllUsersAction = () => { 
  const path = `/users`;
  return axiosCall('get', path, 'GET_USERS_LISTS', null, {'Content-type': 'application/json; charset=UTF-8'});
};

export const addUsersAction = (data) => { 
  const path = `/users`;
  return axiosCall('post', path, 'ADD_USERS', JSON.stringify(data), {'Content-type': 'application/json; charset=UTF-8'});
};
