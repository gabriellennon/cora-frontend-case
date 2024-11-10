import { Transaction } from "../../../../components/Transaction";
import { ItemsList, ResultsList } from "../../../../types";
import { formatCurrency } from "../../../../utils/functions";
import './style.css'

export const TransactionGroup = ({ group, filteredItems }: { group: ResultsList, filteredItems: ItemsList[] }) => {
  return (
    <div key={group.date} className="transaction-group">
      <div className="date-header">
        <h2 className="date">{group.date}</h2>
        <p className="balance">saldo do dia <strong>{formatCurrency(filteredItems.reduce((acc, item) => acc + item.amount, 0) / 100)}</strong></p>
      </div>
      <div className="transactions-card">
        {filteredItems.map(transaction => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}
