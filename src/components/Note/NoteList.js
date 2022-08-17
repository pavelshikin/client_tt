import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import s from '../../styles/Notes.module.scss';
import NoteItem from './NoteItem';
import { Checkbox } from 'antd';

const NoteList = ({ notes, allPosts, checkBox, checkDefault }) => {
  const [check, setCheck] = useState(checkDefault);

  const onChange = e => {
    setCheck(prevState => !prevState);
  };


  const renderCheck = () => {
    return (
      <>
        {checkBox ? (
          <div style={{ overflow: 'auto' }}>
            <Checkbox
              onChange={onChange}
              checked={check}
              className={s.checkBox}
            >
              Все
            </Checkbox>
          </div>
        ) : (
          ''
        )}
      </>
    );
  };

  const renderItems = posts => {
    return posts.map((post, idx) => <NoteItem key={idx} note={post} />);
  };

  if (notes.length === 0 && allPosts?.lenght === 0) {
    return (
      <div className={s.content}>
        {renderCheck()}
        <h2 className={'t-center'}>Нет заметок</h2>
      </div>
    );
  }

  return (
    <div className={s.content}>
      {renderCheck()}
      {check ? renderItems(allPosts) : renderItems(notes)}
    </div>
  );
};

export default NoteList;
