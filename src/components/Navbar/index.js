import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Drawer, Menu, Layout } from 'antd';
import {
  ProfileOutlined,
  MenuOutlined,
  LogoutOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  ReadOutlined,
  LoginOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import s from '../../styles/Navbar.module.scss';

const { Header } = Layout;

const menuItems = [
  {
    text: 'Главная',
    href: '/',
    icon: <HomeOutlined style={{ fontSize: 20 }} />
  },
  // {
  //   text: 'Музыка',
  //   href: '/tracks',
  //   icon: <MusicNoteRoundedIcon color="primary" />
  // },
  {
    text: 'Покупки',
    href: '/products',
    icon: <ShoppingCartOutlined style={{ fontSize: 20 }} />
  },
  {
    text: 'Заметки',
    href: '/notes',
    icon: <ProfileOutlined style={{ fontSize: 20 }} />
  },
  {
    text: 'Фильмы/Книги',
    href: '/filmsandbooks',
    icon: <ReadOutlined style={{ fontSize: 20 }} />
  }
];

function NavBar() {
  const [visible, setVisible] = useState(false);
  const { user, isAuth, logout } = useAuth();
  const history = useHistory();
  const [current, setCurrent] = React.useState(
    String(history.location.pathname)
  );

  useEffect(() => {
    setCurrent(history.location.pathname);
  }, [history.location.pathname]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleClick = e => {
    setCurrent(e.key);
    setVisible(false);
    history.push(e.key);
  };

  const exit = () => {
    logout();
    setCurrent('/login');
    history.push('/login');
  };

  return (
    <>
      <Header className={s.head} style={{ padding: 0 }}>
        <Button
          type="link"
          onClick={showDrawer}
          icon={<MenuOutlined className={s.btmMenu} />}
          size="large"
        />
        <div className={s.rightBox}>
          {user ? (
            <>
              <span>{user.username}</span>
              <Button
                type="link"
                onClick={exit}
                icon={<LogoutOutlined className={s.btnExit} />}
                size="large"
              />
            </>
          ) : (
            ''
          )}
        </div>
      </Header>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ background: '#4d1f77', padding: '40px 0px 0' }}
        width={200}
      >
        <Menu onClick={handleClick} selectedKeys={current} className={s.menu}>
          {isAuth ? (
            menuItems.map(({ text, href, icon }) => (
              <Menu.Item
                type="link"
                key={href}
                icon={icon}
                className={s.menuItem}
              >
                <span style={{ color: '#fff' }}>{text}</span>
              </Menu.Item>
            ))
          ) : (
            <Menu.Item
              type="link"
              key={'/login'}
              icon={<LoginOutlined style={{ fontSize: 20 }} />}
              className={s.menuItem}
            >
              <span style={{ color: '#fff' }}>Вход</span>
            </Menu.Item>
          )}
        </Menu>
      </Drawer>
    </>
  );
}

export default NavBar;
