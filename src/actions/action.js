import {
  Loading,
  RequestLogin,
  SuccessLogin,
  CLEAR_SEARCH_POSTS,
  SUCCESS_SLIDER,
  PENDING_SLIDER,
  NOTIFICATIONS_SUCCESS,
  CATEGORIES_SUCCESS,
  CATEGORIES_PENDING,
  SUCCESS_SEEN,
  SUCCESS_PENDING,
  BLOG_PENDING,
  BLOG_SUCCESS,
  SINGLEPROJECTSUCCESS,
  SINGLEPROJECTPENDING,
  SINGLSERVICEPENDING,
  SINGLSERVICESUCCESS,
  CONTACTERROR,
  CONTACTPENDING,
  CONTACTSUCCESS,
} from '../redux/constants';
import Axios from 'axios';
import {AsyncStorage} from 'react-native';
import Routes from '../config/api/routes';
import PushNotification from 'react-native-push-notification';

export function getSlider(sliderList) {
  return {
    type: SUCCESS_SLIDER,
    pending: false,
    sliderList,
  };
}
function fetchSliderPending() {
  return {
    type: PENDING_SLIDER,
  };
}
function fetchCategoryPending() {
  return {
    type: CATEGORIES_PENDING,
  };
}

function fetchNotifyPending() {
  return {
    type: PENDING_SLIDER,
  };
}
function fetchsubmitpendingSeen() {
  return {
    type: SUCCESS_PENDING,
  };
}

function fetchsubmitSeen() {
  return {
    type: SUCCESS_SEEN,
  };
}

export function fetchNotify(notifications) {
  return {
    type: NOTIFICATIONS_SUCCESS,
    pending: false,
    notifications,
  };
}

export function fetchCategories(categories) {
  return {
    type: CATEGORIES_SUCCESS,
    pending: false,
    categories,
  };
}

function pendingBlogs() {
  return {
    type: BLOG_PENDING,
  };
}

export function fetchBlogs(blogs) {
  return {
    type: BLOG_SUCCESS,
    pending: false,
    blogs,
  };
}

function pendingSingleProject() {
  return {
    type: SINGLEPROJECTPENDING,
  };
}

export function fetchSingleProject(single) {
  return {
    type: SINGLEPROJECTSUCCESS,
    pending: false,
    single,
  };
}

export function LoginSuccess(user, access_token, userLoggedIn) {
  return {
    type: SuccessLogin,
    user,
    access_token,
    userLoggedIn,
  };
}

export function setAsyncStorage(key, item) {
  try {
    AsyncStorage.setItem(key, item);
  } catch (error) {
    console.log(error);
  }
}
export function getAsyncStorage(key) {
  try {
    AsyncStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }
}
export const FBTOKEN = status => {
  return AsyncStorage.get('TokenFirebase');
};

export function ErrorMessage(message, error) {
  return {
    type: ErrorMessage,
    error,
    message,
  };
}
export function LoadingState(loading) {
  return {
    type: Loading,
    loading,
  };
}
export function ChangeLoadingState(loading) {
  return dispatch => {
    dispatch(LoadingState(loading));
  };
}
export function RequestLoginFromUser(request) {
  return {
    type: RequestLogin,
    request,
  };
}
export function fetchSingleServicepending() {
  return {
    type: SINGLSERVICEPENDING,
  };
}

export function fetchSingleService(singlecategory) {
  return {
    type: SINGLSERVICESUCCESS,
    singlecategory,
  };
}
export function pendingcontact() {
  return {
    type: CONTACTPENDING,
  };
}
export function SuccessContact(data) {
  return {
    type: CONTACTSUCCESS,
    data,
  };
}
export function ErrorContact(data) {
  return {
    type: CONTACTERROR,
    data,
  };
}

//Main Function Screens

export function RegisterUser(phone) {
  return dispatch => {
    PushNotification.configure({
      onRegister: function (fbtoken) {
        Axios.post(Routes.RegisterUser, {
          password: 123456,
          phone: phone,
          firebase_token: fbtoken.token,
        }).then(async response => {
          if (response.status === 200) {
            dispatch(
              LoginSuccess(
                response.data.userInfo,
                response.data.access_token,
                true,
              ),
            );
            try {
              await AsyncStorage.setItem(
                'user',
                JSON.stringify(response.data.userInfo),
              );
              await AsyncStorage.setItem('userLoggedIn', true);
              await AsyncStorage.setItem(
                'access_token',
                JSON.stringify(response.data.access_token),
              );
            } catch (error) {
              console.log(error);
            }
          }
        });
      },
    });
  };
}
export function sendContact(name, email, phone, info, service_id) {
  let Options = {
    headers: {
      Accept: 'application/json',
    },
  };
  const data = {
    name: name,
    email: email,
    phone: phone,
    info: info,
    cat_id: service_id,
  };

  return async dispatch => {
    dispatch(pendingcontact());
    Axios.post(Routes.ContactStore, data, Options).then(response => {
      if (response.status == 200) {
        dispatch(SuccessContact(response.data.data));
      } else {
        dispatch(ErrorContact(response.data.data));
      }
    });
    try {
    } catch (error) {
      console.log(error);
    }
  };
}

export function SliderImages() {
  return async dispatch => {
    dispatch(fetchSliderPending());
    let url = Routes.Sliders;
    Axios.get(url).then(response => {
      dispatch(getSlider(response.data.data));
    });
    try {
    } catch (error) {
      console.log(error);
    }
  };
}
export function getNotifications(Auth) {
  let Options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${Auth}`,
    },
  };
  return async dispatch => {
    dispatch(fetchNotifyPending());
    Axios.get(Routes.Notification, Options).then(response => {
      dispatch(fetchNotify(response.data.data));
    });
    try {
    } catch (error) {
      console.log(error);
    }
  };
}
export function updateSeen(id, Auth) {
  let Options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${Auth}`,
    },
  };
  return async dispatch => {
    dispatch(fetchsubmitpendingSeen());
    Axios.post(
      Routes.NotificationSeen,
      {
        id: id,
      },
      Options,
    ).then(async response => {
      dispatch(fetchsubmitSeen());
      dispatch(fetchNotify(response.data.data));
    });
    try {
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCategories() {
  let Options = {
    headers: {
      Accept: 'application/json',
    },
  };
  return async dispatch => {
    dispatch(fetchCategoryPending());
    Axios.get(Routes.Categories, Options).then(response => {
      dispatch(fetchCategories(response.data.data));
    });
    try {
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSingleCategory(id) {
  let Options = {
    headers: {
      Accept: 'application/json',
    },
  };
  return async dispatch => {
    dispatch(fetchSingleServicepending());
    Axios.get(Routes.ServiceCategory(id), Options).then(response => {
      dispatch(fetchSingleService(response.data.data[0]));
    });
    try {
    } catch (error) {
      console.log(error);
    }
  };
}

export function getBlogs() {
  let Options = {
    headers: {
      Accept: 'application/json',
    },
  };
  return async dispatch => {
    dispatch(pendingBlogs());
    Axios.get(Routes.Blogs, Options).then(response => {
      dispatch(fetchBlogs(response.data.data));
    });
    try {
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSingleBlog(id) {
  let Options = {
    headers: {
      Accept: 'application/json',
    },
  };
  return async dispatch => {
    dispatch(pendingBlogs());
    Axios.get(Routes.SingleBlog(id), Options).then(response => {
      dispatch(fetchBlogs(response.data.data));
    });
    try {
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSingleProject(id) {
  let Options = {
    headers: {
      Accept: 'application/json',
    },
  };
  return async dispatch => {
    dispatch(pendingSingleProject());
    Axios.get(Routes.SingleProject(id), Options).then(response => {
      dispatch(fetchSingleProject(response.data.data[0]));
    });
    try {
    } catch (error) {
      console.log(error);
    }
  };
}

export const searchPosts = (searchText, limit) => {};

export const clearSearchPosts = () => {
  return dispatch => {
    dispatch({type: CLEAR_SEARCH_POSTS});
  };
};
export const stopSearchPosts = () => {
  return dispatch => {
    dispatch({type: SEARCH_POSTS_STOPPED});
  };
};
