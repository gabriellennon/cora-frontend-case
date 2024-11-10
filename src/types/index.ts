export interface ItemsList {
  id: string;
  description: string;
  label: string;
  entry: "DEBIT" | "CREDIT";
  amount: number;
  name: string;
  dateEvent: string;
  status: string;
}

export interface ResultsList {
  items: ItemsList[];
  date: string;
}

export interface IResponseList {
  results: ResultsList[]
  itemsTotal: number;
}
