import React, { memo, useCallback, useContext } from 'react';
import { TodoContext, INPUT_TEXT, ADD_TODO_LIST } from './TodoList';
import { Button, TextField } from '@mui/material';
import { PostAdd } from '@mui/icons-material';

const Add = memo(() => {
  console.log('render Add');
  const { text, dispatch } = useContext(TodoContext);

  const onChangeText = useCallback((e) => {
    console.log(`onChangeText`);
    dispatch({ type: INPUT_TEXT, text: e.target.value });
  }, []);

  const onClickAdd = () => {
    // console.log('onClickAdd');
    // 리스트에 텍스트 추가.
    if (text) {
      dispatch({ type: ADD_TODO_LIST, text: text });
    }
  };

  return (
    <>
      <TextField id="outlined-basic" variant="outlined" value={text} onChange={onChangeText} />
      <Button variant="outlined" onClick={onClickAdd} endIcon={<PostAdd />}>
        추가
      </Button>
    </>
  );
});

export default Add;
