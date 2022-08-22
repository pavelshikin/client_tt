import React from 'react';
import { useDispatch } from 'react-redux';
import { hideError } from '../../store/actions';
import { Modal } from 'antd';

const ModalError = ({ text }) => {
  const dispatch = useDispatch();

  const close = () => {
    dispatch(hideError());
  };

  function error() {
    Modal.error({
      title: 'Ошибка',
      content: text,
      onOk() {
        close();
      }
    });
  }

  return <>{error()}</>;
};

export default ModalError;
