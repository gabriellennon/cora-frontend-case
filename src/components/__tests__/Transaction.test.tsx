import { render, screen } from '@testing-library/react';
import { ItemsList } from '../../types';
import { Transaction } from '../Transaction';

const mockTransaction: ItemsList = {
  id: "abc123def456ghi789",
  description: "Compra de produtos eletrônicos",
  label: "Compra aprovada",
  entry: "DEBIT",
  amount: 150000,
  name: "João da Silva",
  dateEvent: "2024-02-01T08:15:17Z",
  status: "COMPLETED"
};

describe('Transaction Component', () => {
  test('renders transaction details correctly for DEBIT', () => {
    render(<Transaction transaction={mockTransaction} />);

    expect(screen.getByText(/Compra aprovada/i)).toBeInTheDocument();
    expect(screen.getByText(/Compra de produtos eletrônicos/i)).toBeInTheDocument();
    expect(screen.getByText(/2\/1\/2024 - 5:15:17 am/i)).toBeInTheDocument();
    expect(screen.getByText(/\+ r\$ 1\.500,00/i)).toBeInTheDocument();
  });

  test('renders transaction details correctly for CREDIT', () => {
    const creditTransaction: ItemsList = { ...mockTransaction, entry: "CREDIT", amount: -150000 };
    render(<Transaction transaction={creditTransaction} />);

    expect(screen.getByText(/Compra aprovada/i)).toBeInTheDocument();
    expect(screen.getByText(/Compra de produtos eletrônicos/i)).toBeInTheDocument();
    expect(screen.getByText(/2\/1\/2024 - 5:15:17 am/i)).toBeInTheDocument();
    expect(screen.getByText(/r\$ 1\.500,00/i)).toBeInTheDocument();
  });
});
