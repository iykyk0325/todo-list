import "./App.css";

import { createContext, useCallback, useMemo, useReducer, useRef } from "react";

import Editor from "./components/Editor";
import Header from "./components/Header";
import List from "./components/List";

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "cheering for Tottenham",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: true,
    content: "drinking beer at a pub",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "visiting London Bridge",
    date: new Date().getTime(),
  },
];

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return [action.data.newTodo, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.data.targetId
          ? { ...item, isDone: !item.isDone }
          : item,
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.data.targetId);
    default:
      return state;
  }
};

const App = () => {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(mockData.length);

  const onCreate = useCallback((content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };
    dispatch({ type: "CREATE", data: { newTodo } });
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({ type: "UPDATE", data: { targetId } });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({ type: "DELETE", data: { targetId } });
  }, []);

  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
};

export default App;
