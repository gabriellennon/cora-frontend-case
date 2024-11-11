import { TodoItemProps } from "../types";

export const TodoItem = ({ item, index, onDelete, onStatusChange }: TodoItemProps) => (
  <li key={item.id}>
    <span>{index + 1}{item.required ? "*" : ""}.</span>
    <div className="todo__content">
      <h3>{item.title} <span data-type={item.status}>{item.status}</span></h3>
      <p>{item.description}</p>
      {item.links && (
        <div className="todo__links">
          {item.links.map((link, i) => (
            <a key={i} href={link.url || link.link} target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          ))}
        </div>
      )}
      <div className="todo__actions">
        <button id="delete" className="delete" onClick={() => onDelete(item.id)}>delete</button>
        <button onClick={() => onStatusChange(item.id, item.status)}>
          change to <strong><u>{item.status === "done" ? "pending" : "done"}</u></strong>
        </button>
      </div>
    </div>
  </li>
);
