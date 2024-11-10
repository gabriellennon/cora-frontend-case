import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "../../utils/functions";
import { ItemsList } from "../../types";
import './styles.css'

export const Transaction = ({ transaction }: { transaction: ItemsList }) => {
  return (
    <div className="transaction">
      <div className="transaction-info">
        {transaction.entry === "DEBIT" ? (
          <ArrowDownLeft className="icon refund" />
        ) : (
          <ArrowUpRight className="icon received" />
        )}
        <p className="merchant">{transaction.label}</p>
      </div>
      <p className="type">{transaction.description}</p>
      <p className="date-time">
        {new Date(transaction.dateEvent).toLocaleDateString()} - {new Date(transaction.dateEvent).toLocaleTimeString()}
      </p>
      <div className="transaction-details">
        <p className={`amount ${transaction.entry === "DEBIT" ? "negative-amount" : "positive-amount"}`}>
          {transaction.amount > 0 && "+ "}
          {formatCurrency(Math.abs(transaction.amount) / 100)}
        </p>
      </div>
    </div>
  );
}
