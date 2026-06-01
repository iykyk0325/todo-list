import "./List.css";

import { useContext, useMemo, useState } from "react";

import { TodoStateContext } from "../App";
import TodoItem from "./TodoItem";

const List = () => {
  const todos = useContext(TodoStateContext);

  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }

    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase()),
    );
  };

  const filteredTodos = getFilteredData();

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    console.log("getAnalyzedData() 실행");
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return { totalCount, doneCount, notDoneCount };
  }, [todos]);

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>
      <div className="analyze_wrapper">
        <h4>Analyze</h4>
        <div className="analyze_grid">
          <div className="analyze_card">
            <span>Total</span>
            <strong>{totalCount}</strong>
          </div>
          <div className="analyze_card done">
            <span>Done</span>
            <strong>{doneCount}</strong>
          </div>
          <div className="analyze_card pending">
            <span>Not Done</span>
            <strong>{notDoneCount}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
