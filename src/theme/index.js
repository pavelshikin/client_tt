import color from './palette.module.scss';
import styled from 'styled-components';
import { Button } from 'antd';

export const Btn = styled(Button)`
  &&& {
    background: ${color.secondary};
    border: none;
    color: ${color.bgMain};
    font-weight: 500;

    &:hover {
      background: ${color.secHover};
    }
  }
`;
