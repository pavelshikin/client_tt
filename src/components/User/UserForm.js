import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import s from '../../styles/Notes.module.scss';
import { Input } from 'antd';
import { Btn } from '../../theme';
import { Collapse } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { createUser } from '../../store/actions';

const { Panel } = Collapse;

const UserForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const addUser = () => {
    if(!email || !password || !username){
      setError('Заполните все поля');
    } else {
        setError('');

        let data = {
          email,
          password,
          username
        };

        dispatch(createUser(data));
        setEmail('');
        setPassword('');
        setUsername('');
    }
  };

  return (
    <div className={s.noteFormBox}>
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => (
          <PlusCircleOutlined
            rotate={isActive ? 90 : 0}
            style={{ fontSize: 20 }}
          />
        )}
      >
        <Panel header="Добавить" className={s.panel}>
          <div className={s.noteForm}>
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              type="text"
              style={{ marginTop: 10, background: '#fff', borderRadius: 5 }}
            />
            <Input
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Пароль"
              type="text"
              style={{ marginTop: 10, background: '#fff', borderRadius: 5 }}
            />
            <Input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Имя"
              type="text"
              style={{ marginTop: 10, background: '#fff', borderRadius: 5 }}
            />
            <div className={'error'}>{error}</div>
            <Btn
              type="primary"
              ghost={false}
              block
              style={{ marginTop: 'auto' }}
              onClick={addUser}
            >
              Добавить
            </Btn>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default UserForm;
