import { useCallback } from "react";

import { useState } from "react";
import { listTransactions } from "../services/ibanking.service";
import { IResponseList } from "../types";

export const useGetTransactions = () => {
  const [data, setData] = useState<IResponseList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await listTransactions();
      setData(response.data)
      setSuccess(true);
    } catch (err) {
      console.error(err)
      setError('Erro ao puxar a lista de transações. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = () => {
    if (error) {
      fetchTransactions();
    }
  };

  return { fetchTransactions, loading, error, success, data, refetch };
};
