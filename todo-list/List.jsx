import React, { memo, useCallback, useContext, useState } from 'react';
import {
  TodoContext,
  CLICK_CHECKBOX,
  EDIT_TODO_LIST,
  DEL_TODO_LIST,
  TEMP_EDIT_TODO_LIST,
  CLICK_RIGHT,
} from './TodoList';

const List = memo(() => {
  console.log('render List');

  const { todoList, dispatch } = useContext(TodoContext);

  // 체크 여부에 따라 스타일 변경
  const getListStyled = (isChecked) => {
    // console.log('call getListStyled');
    return isChecked ? { color: '#888', textDecoration: 'line-through' } : {};
  };

  // 체크박스 클릭
  const onClickCheckBox = (e) => {
    dispatch({ type: CLICK_CHECKBOX, id: e.target.id });
  };

  const onClickRight = (e) => {
    console.log('onClickRight', e.target.id);
    e.preventDefault();
    let id = e.target.id;
    if (!id) {
      id = e.target.parentElement.id;
    }
    dispatch({ type: CLICK_RIGHT, id: id });
  };

  const onChangeText = (e) => {
    console.log('onChangeText', e.target.id);
    dispatch({ type: TEMP_EDIT_TODO_LIST, id: e.target.id, text: e.target.value });
  };

  const onClickEdit = useCallback((e) => {
    dispatch({ type: EDIT_TODO_LIST, id: e.target.id });
  }, []);

  const onClickDel = useCallback((e) => {
    dispatch({ type: DEL_TODO_LIST, id: e.target.id });
  }, []);

  return (
    <>
      {todoList.map((data) =>
        data.isEdit ? (
          <div
            key={data.id}
            id={data.id}
            onContextMenu={onClickRight}
            className="flex-row"
            style={{ justifyContent: 'flex-start' }}
          >
            <input type="text" id={data.id} value={data.tempContent} onChange={onChangeText} />
            <button onClick={onClickEdit} id={data.id}>
              수정
            </button>
            <button onClick={onClickDel} id={data.id}>
              삭제
            </button>
          </div>
        ) : (
          <div key={data.id}>
            <input
              type="checkbox"
              id={data.id}
              onChange={onClickCheckBox}
              checked={data.isChecked}
            />
            <label
              htmlFor={data.id}
              id={data.id}
              style={getListStyled(data.isChecked)}
              onContextMenu={onClickRight}
            >
              {data.content}
            </label>
          </div>
        )
      )}
    </>
  );
});

export default List;
