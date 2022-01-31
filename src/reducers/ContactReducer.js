import {CONTACTERROR, CONTACTPENDING, CONTACTSUCCESS} from '../redux/constants';

const intialState = {
  pending: false,
  success: null,
  data: [],
};

export default function ContactReducer(state = intialState, action) {
  switch (action.type) {
    case CONTACTPENDING:
      return {
        ...state,
        pending: true,
      };
    case CONTACTSUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        data: action.data,
      };
    case CONTACTERROR:
      return {
        ...state,
        pending: false,
        success: false,
        data: action.data,
      };

    default:
      return {
        ...state,
      };
  }
}
