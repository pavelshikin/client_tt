import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import s from '../../styles/Notes.module.scss';
import { Input } from 'antd';
import { removePost, updatePost, fetchPosts } from '../../store/actions';
import { DeleteFilled, EditFilled  } from '@ant-design/icons';
import { Btn } from '../../theme';

const { TextArea } = Input;

const NoteItem = ({ note }) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const dispatch = useDispatch();

  const deleteNote = id => {
    dispatch(removePost(id));
  };

  const updateNote = postId => {
    let post = {
      id: postId,
      title,
      content
    };
    dispatch(updatePost(post))
    dispatch(fetchPosts())
    setEditMode(false)
  }

  const renderEditMode = () => {
   return (

     <div className={s.note}>
      <div className={s.head}>
        <div className={s.noteForm} style={{width: '100%'}}>
          <Input         value={ title }
                         onChange={ e => setTitle(e.target.value) }
                         type="text"
                         style={{ marginTop: 10, background: '#fff', borderRadius: 5 }}
          />
          <TextArea
                value={content}
                autoFocus={true}
                onChange={e => setContent(e.target.value)}
                placeholder="Текст"
                style={{ margin: '10px 0 10px', borderRadius: 5, padding: 10 }}
          />
          <Btn
              type="primary"
              ghost={false}
              block
              style={{ marginTop: 'auto' }}
              onClick={() => updateNote(note._id)}
          >
            Изменить
          </Btn>
        </div>
      </div>
    </div>
   )
  }


  return (
    <>{editMode ? renderEditMode() :
    <div className={s.note}>
      <div className={s.head}>
        <div className={s.title}>{note.title}</div>
        <div className={s.btnBox}>
          <div onClick={() => {
              setEditMode(true)
              setTitle(note.title)
              setContent(note.content)
           } }>
            <EditFilled className={s.changeBtn}/>
          </div>
          <div onClick={() => deleteNote(note._id)}>
            <DeleteFilled className={s.deleteBtn} />
          </div>
        </div>
      </div>
      {note.content ? <div className={s.content}>{note.content}</div> : null}
    </div>
   }</>
  );
};

export default NoteItem;
