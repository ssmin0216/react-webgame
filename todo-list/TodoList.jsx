import React, { createContext, useEffect, useMemo, useReducer } from 'react';
import { isMobile } from 'react-device-detect';
import Add from './Add';
import List from './List';

const INIT = 'INIT'; // 페이지 진입
const CLICK_THEME = 'CLICK_THEME'; // 테마 변경
export const CLICK_RIGHT = 'CLICK_RIGHT'; // 우클릭 (수정모드)
export const INPUT_TEXT = 'INPUT_TEXT'; // 할일 입력
export const ADD_TODO_LIST = 'ADD_TODO_LIST'; // 할일 추가
export const EDIT_TODO_LIST = 'EDIT_TODO_LIST'; // 할일 수정
export const TEMP_EDIT_TODO_LIST = 'TEMP_EDIT_TODO_LIST'; // 할일 수정 중
export const DEL_TODO_LIST = 'DEL_TODO_LIST'; // 할일 삭제
export const CLICK_CHECKBOX = 'CLICK_CHECKBOX'; // 할일 체크

const initialState = {
  todoList: [],
  text: '',
  isDark: false,
  isLoading: true,
};

const reducer = (state, action) => {
  let nextState;
  switch (action.type) {
    case INIT: {
      return {
        ...state,
        ...action.initData,
        text: '',
        isLoading: false,
      };
    }
    case CLICK_THEME: {
      nextState = {
        ...state,
        isDark: !state.isDark,
      };
      break;
    }

    case CLICK_RIGHT: {
      console.log('DISPATCH CLICK RIGHT');
      const todoList = [...state.todoList];
      let index = -1;
      todoList.forEach((data, i) => {
        if (Number(data.id) === Number(action.id)) {
          index = i;
        }
      });
      todoList[index].isEdit = !todoList[index].isEdit;
      todoList[index].tempContent = todoList[index].content;
      nextState = {
        ...state,
        todoList: todoList,
      };
      break;
    }

    case INPUT_TEXT: {
      return {
        ...state,
        text: action.text,
      };
    }

    case ADD_TODO_LIST: {
      let maxId = 0;
      [...state.todoList].forEach((data) => {
        if (data.id > maxId) {
          maxId = data.id;
        }
      });
      nextState = {
        ...state,
        todoList: [
          ...state.todoList,
          {
            id: maxId + 1,
            content: action.text,
            tempContent: action.text,
            isChecked: false,
            isEdit: false,
          },
        ],
        text: '',
      };
      break;
    }

    case TEMP_EDIT_TODO_LIST: {
      const todoList = [...state.todoList];
      let index = -1;
      todoList.forEach((data, i) => {
        console.log('for', data);
        if (Number(data.id) === Number(action.id)) {
          console.log('data ', data.id, ' action ', action.id);
          index = i;
        }
      });
      console.log('action', action.id, 'index : ', index);
      todoList[index].tempContent = action.text;
      nextState = {
        ...state,
        todoList: todoList,
      };
      break;
    }

    case EDIT_TODO_LIST: {
      const todoList = [...state.todoList];
      let index = -1;
      todoList.forEach((data, i) => {
        if (Number(data.id) === Number(action.id)) {
          index = i;
        }
      });
      todoList[index].isEdit = !todoList[index].isEdit;
      todoList[index].content = todoList[index].tempContent;
      nextState = {
        ...state,
        todoList: todoList,
      };
      break;
    }

    case DEL_TODO_LIST: {
      nextState = {
        ...state,
        todoList: [...state.todoList].filter((t) => t.id != action.id),
      };
      break;
    }

    case CLICK_CHECKBOX: {
      const todoList = [...state.todoList];
      let index = -1;
      todoList.forEach((data, i) => {
        if (Number(data.id) === Number(action.id)) {
          index = i;
        }
      });
      todoList[index].isChecked = !todoList[index].isChecked;
      nextState = {
        ...state,
        todoList: todoList,
      };
      break;
    }

    default:
      return state;
  }
  localStorage.setItem('data', JSON.stringify(nextState));
  return nextState;
};

export const TodoContext = createContext({
  todoList: [],
  dispatch: () => {},
});

const TodoList = () => {
  console.log('render TodoList');
  const [state, dispatch] = useReducer(reducer, initialState);
  const { todoList, text, isDark, isLoading } = state;
  const textValue = useMemo(() => ({ text, dispatch }), [text]);
  const listValue = useMemo(() => ({ todoList, dispatch }), [todoList]);

  useEffect(() => {
    console.log('useEffect!!!');
    const storedData = localStorage.getItem('data');
    const initData = storedData ? JSON.parse(storedData) : [];
    dispatch({ type: INIT, initData: initData });
  }, []);

  const onClickTheme = () => {
    dispatch({ type: CLICK_THEME });
  };

  if (isLoading) {
    return <>데이터 로딩중...</>;
  }
  return (
    <>
      <div
        style={{
          padding: '30px',
          margin: '30px',
          border: '1px solid black',
          backgroundColor: isDark ? 'black' : 'white',
          color: isDark ? 'white' : 'black',
        }}
      >
        <div className="flex-row">
          <h1>TODO LIST!!</h1>

          <p className="flex-column">
            <span
              className="theme"
              style={{
                backgroundColor: isDark ? 'white' : 'black',
              }}
              onClick={onClickTheme}
            ></span>
            <span>테마</span>
          </p>
        </div>
        {isMobile ? <h5>길게 눌러 편집해보세요!!</h5> : <h5>우클릭으로 편집해보세요~~</h5>}

        <TodoContext.Provider value={textValue}>
          <Add />
        </TodoContext.Provider>
        <TodoContext.Provider value={listValue}>
          <List />
        </TodoContext.Provider>
      </div>
    </>
  );
};

export default TodoList;
