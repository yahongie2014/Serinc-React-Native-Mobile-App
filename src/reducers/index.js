import {combineReducers} from 'redux';
import auth from './auth';
import SliderReducer from './sliderReducer';
import Notification from './notificationReducer';
import CategoriesReducer from './categoriesReducer';
import blogReducer from './blogReducer';
import Search from './searchReducer';
import SingleProject from './singleProjectReducer';
import SingleService from './SingleserviceReducer';
import contactService from './ContactReducer';

const rootReducer = combineReducers({
  auth,
  SliderReducer,
  Notification,
  CategoriesReducer,
  blogReducer,
  Search,
  SingleProject,
  SingleService,
  contactService,
});

export default rootReducer;
