import './style.css'
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import { FilterTabs } from "./components/FilterTabs";
import { TransactionGroup } from "./components/TransactionGroup";
import { useGetTransactions } from '../../hooks/useTransactions';
import { Loading } from '../../components/Loading';

function IBanking() {
  const [filter, setFilter] = useState("ALL");
  const { loading, fetchTransactions, data, error, refetch } = useGetTransactions()

  const filteredItems = data?.results.flatMap(group =>
    group.items.filter(transaction =>
      filter === "ALL" || transaction.entry === filter
    )
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  if(loading) return <Loading title='Carregando' />

  return (
    <>
      <Header />
      <div className="container">
        {data && !error?.length && (
          <FilterTabs filter={filter} setFilter={setFilter} />
        )}
        {data && !error?.length && data.results.map(group => (
          <TransactionGroup key={group.date} group={group} filteredItems={filteredItems || []} />
        ))}
        {error && (
          <div className="container">
            <h2>Ops, algo deu errado.</h2>
            <button
                className="error-button"
                onClick={refetch}
            >
                Tentar novamente
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export { IBanking };
