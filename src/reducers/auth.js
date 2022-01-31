import {
  LoggedIn,
  RequestLogin,
  RequestSignup,
  SuccessLogin,
} from '../redux/constants';
const intialState = {
  userRequestLogin: false,
  registirationRequested: true,
  user: [],
  accessToken: '',
  status: false,
};
export default function auth(state = intialState, action) {
  switch (action.type) {
    case LoggedIn:
      return {
        ...state,
        userLoggedIn: action.user,
      };
    case RequestLogin:
      return {
        ...state,
        userRequestLogin: action.request,
      };
    case RequestSignup:
      return {
        ...state,
        registirationRequested: action.request,
      };

    case SuccessLogin:
      return {
        ...state,
        userLoggedIn: true,
        user: action.user,
        accessToken: action.access_token,
      };
    default:
      return {
        ...state,
      };
  }
}
