import {
  NOTIFICATIONS_PENDING,
  NOTIFICATIONS,
  NOTIFICATIONS_SUCCESS,
  SUCCESS_SEEN,
  SUCCESS_PENDING,
} from '../redux/constants';

const intialState = {
  notifications: [],
  pending: false,
  submit: false,
};

export default function notificationReducer(state = intialState, action) {
  switch (action.type) {
    case NOTIFICATIONS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case SUCCESS_PENDING:
      return {
        ...state,
        submit: false,
      };
    case SUCCESS_SEEN:
      return {
        ...state,
        submit: true,
      };
    case NOTIFICATIONS:
      return {
        ...state,
        pending: true,
        notifications: action.notifications,
      };
    case NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        notifications: action.notifications,
      };

    default:
      return {
        ...state,
      };
  }
}
