const userReducer = (state, action) => {
    if (typeof state === 'undefined') {
      return [];
    }
    switch (action.type) {
      case 'GET_USERS_LISTS_SUCCESS':
      case 'GET_USERS_LISTS_ERROR':
        return {
          ...state,
          GetAllUserData: action.updatePayload,
        };
      case 'ADD_USERS_SUCCESS':
      case 'ADD_USERS_ERROR':
        return {
          ...state,
          AddUserData: action.updatePayload,
        };
      case 'FETCH_ERROR':
        return {
          ...state,
          apiErrorUser: action.updatePayload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  