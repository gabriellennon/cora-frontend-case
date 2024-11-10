import logoImage from "../../assets/logo.svg";
import { useTodo } from "../../hooks/useTodo";
import { SearchForm } from "./components/SearchForm";
import { TodoList } from "./components/TodoList";
import "./index.css";
import { Header } from "../../components/Header";

function Todo() {
  const {
    items,
    searchInputValue,
    handleSearchChange,
    handleSearchSubmit,
    handleDeleteTask,
    handleChangeTaskStatus,
  } = useTodo();

  return (
    <>
      <Header />
      <main id="page" className="todo">
        <div>
          <img src={logoImage} alt="Cora" title="Cora"></img>
          <h1>Weekly to-do list &#128467;</h1>
          <h2>
            Bem-vindo ao nosso produto <i>fake</i> de <strong>to-do</strong> list
          </h2>
          <p>
            Marque como{" "}
            <strong>
              <u>done</u>
            </strong>{" "}
            as tasks que você conseguir concluir (elas já precisam renderizar com
            o status <strong>done</strong>)
          </p>
          <p className="disclaimer">
            Items obrigatórios marcados com arteristico (<strong>*</strong>)
          </p>
          <div className="todo__wrapper">
            <SearchForm
              searchInputValue={searchInputValue}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
            />
            <TodoList
              items={items}
              onDelete={handleDeleteTask}
              onStatusChange={handleChangeTaskStatus}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Todo;
