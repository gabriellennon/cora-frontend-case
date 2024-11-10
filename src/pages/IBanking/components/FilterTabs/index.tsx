import './styles.css'

type FilterTabsProps = {
  filter: string;
  setFilter: (filter: string) => void;
}

export const FilterTabs = ({ filter, setFilter }: FilterTabsProps) => {
  return (
    <div className="tabs">
      <button className={`tab ${filter === "ALL" ? "active" : ""}`} onClick={() => setFilter("ALL")}>Todos</button>
      <button className={`tab ${filter === "DEBIT" ? "active" : ""}`} onClick={() => setFilter("DEBIT")}>Débito</button>
      <button className={`tab ${filter === "CREDIT" ? "active" : ""}`} onClick={() => setFilter("CREDIT")}>Crédito</button>
    </div>
  );
}
