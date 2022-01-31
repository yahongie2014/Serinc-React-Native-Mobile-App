import {BLOG_PENDING, BLOGS, BLOG_SUCCESS} from '../redux/constants';

const intialState = {
  blogs: [],
  pending: false,
};

export default function blogReducer(state = intialState, action) {
  switch (action.type) {
    case BLOG_PENDING:
      return {
        ...state,
        pending: true,
      };
    case BLOGS:
      return {
        ...state,
        pending: false,
        blogs: action.blogs,
      };
    case BLOG_SUCCESS:
      return {
        ...state,
        pending: false,
        blogs: action.blogs,
      };
    default:
      return {
        ...state,
      };
  }
}
