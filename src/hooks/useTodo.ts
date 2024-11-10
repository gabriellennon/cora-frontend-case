import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { TODO_LIST } from "../pages/Todo/initial-state";
import { ITodoTypes } from "../pages/Todo/types";


export const useTodo = () => {
  const [items, setItems] = useState(TODO_LIST);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [search, setSearch] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSearch(searchInputValue);
  };

  const handleDeleteTask = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleChangeTaskStatus = (id: string, status: ITodoTypes) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, status: status === "done" ? "pending" : "done" } : item
      )
    );
  };

  useEffect(() => {
    setItems(
      search
        ? TODO_LIST.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          )
        : TODO_LIST
    );
  }, [search]);

  return {
    items,
    searchInputValue,
    handleSearchChange,
    handleSearchSubmit,
    handleDeleteTask,
    handleChangeTaskStatus,
  };
};
