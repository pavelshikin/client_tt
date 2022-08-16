import { appTypes } from '../types';

export const showLoader = () => {
  return {
    type: appTypes.SHOW_LOADER
  };
};

export const hideLoader = () => {
  return {
    type: appTypes.HIDE_LOADER
  };
};

export const showError = text => {
  return {
    type: appTypes.SHOW_ERROR,
    payload: text
  };
};

export const hideError = () => {
  return {
    type: appTypes.HIDE_ERROR
  };
};
