import { ChangeEvent, FormEvent } from "react";

export type ITodoTypes = "pending" | "done";

export type ILinksTodo = {
  name: string;
  link?: string;
  url?: string;
}

export type ITodoObject = {
  id: string;
  ref: string;
  title: string;
  description: React.ReactNode;
  status: ITodoTypes;
  required: boolean;
  links?: ILinksTodo[];
}

export interface TodoItemProps {
  item: ITodoObject;
  index: number;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ITodoTypes) => void;
}

export interface TodoListProps {
  items: ITodoObject[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ITodoTypes) => void;
}

export interface SearchFormProps {
  searchInputValue: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: FormEvent) => void;
}

export type IEntryTypes = "DEBIT" | "CREDIT"

export interface IItemsList {
  id: string;
  description: string;
  label: string;
  entry: IEntryTypes;
  amount: number;
  name: string;
  dateEvent: string;
  status: string;
}

interface IResultsList {
  items: IItemsList[]
  date: string;
}

export interface IResponseList {
  results: IResultsList[]
  itemsTotal: number
}
