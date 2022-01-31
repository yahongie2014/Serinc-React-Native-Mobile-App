import {SLIDERS, PENDING_SLIDER, SUCCESS_SLIDER} from '../redux/constants';
const intialState = {
  sliderList: [],
  pending: false,
};
export default function SliderReducer(state = intialState, action) {
  switch (action.type) {
    case PENDING_SLIDER:
      return {
        ...state,
        pending: true,
      };
    case SLIDERS:
      return {
        ...state,
        pending: true,
        sliderList: action.sliderList,
      };
    case SUCCESS_SLIDER:
      return {
        ...state,
        pending: false,
        sliderList: action.sliderList,
      };
    default:
      return {
        ...state,
      };
  }
}
