import { SearchFormProps } from "../types";

export const SearchForm = ({ searchInputValue, onSearchChange, onSearchSubmit }: SearchFormProps) => (
  <form className="todo__search" onSubmit={onSearchSubmit}>
    <input
      id="search"
      placeholder="busca por texto..."
      value={searchInputValue}
      onChange={onSearchChange}
    />
    <button type="submit">buscar</button>
  </form>
);
