import { TodoListProps } from "../types";
import { TodoItem } from "./TodoItem";

export const TodoList = ({ items, onDelete, onStatusChange }: TodoListProps) => (
  <ul className="todo__list">
    {items.length === 0 ? (
      <span>
        <strong>Ops!!!</strong> Nenhum resultado foi encontrado &#128533;
      </span>
    ) : (
      items.map((item, i) => (
        <TodoItem
          key={`${item.id}-${i}`}
          item={item}
          index={i}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))
    )}
  </ul>
);
