const homeReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return [];
  }
  switch (action.type) {
    case 'GET_LISTS_SUCCESS':
    case 'GET_LISTS_ERROR':
      return {
        ...state,
        GetAllBlogData: action.updatePayload,
      };
    case 'DELETE_BLOG_SUCCESS':
    case 'DELETE_BLOG_ERROR':
      return {
        ...state,
        DeleteBlog: action.updatePayload,
      };
    case 'ADD_BLOG_SUCCESS':
    case 'ADD_BLOG_ERROR':
      return {
        ...state,
        AddBlog: action.updatePayload,
      };
    case 'EDIT_BLOG_SUCCESS':
    case 'EDIT_BLOG_ERROR':
      return {
        ...state,
        EditBlog: action.updatePayload,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        apiErrorHome: action.updatePayload,
      };
    default:
      return state;
  }
};

export default homeReducer;
