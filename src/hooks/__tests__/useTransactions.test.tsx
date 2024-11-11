import { renderHook, act, waitFor } from "@testing-library/react";
import { IResponseList } from "../../types";
import { listTransactions } from "../../services/ibanking.service";
import { useGetTransactions } from "../useTransactions";

jest.mock("../../services/ibanking.service");

describe("useGetTransactions Hook", () => {
  const mockResponse: IResponseList = {
    results: [
      {
        items: [
          {
            id: "1",
            description: "Compra em supermercado",
            label: "Mercado",
            entry: "DEBIT",
            amount: 100.0,
            name: "Supermercado XYZ",
            dateEvent: "2024-11-10",
            status: "COMPLETED",
          },
        ],
        date: "2024-11-10",
      },
    ],
    itemsTotal: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should set loading true when calling fetchTransactions", async () => {
    (listTransactions as jest.Mock).mockResolvedValue({ data: mockResponse });
    const { result } = renderHook(() => useGetTransactions());

    act(() => {
      result.current.fetchTransactions();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
  });

  it("should return correct data when calling fetchTransactions with success", async () => {
    (listTransactions as jest.Mock).mockResolvedValue({ data: mockResponse });
    const { result } = renderHook(() => useGetTransactions());

    await act(async () => {
      result.current.fetchTransactions();
    });

    await waitFor(() => expect(result.current.data).toEqual(mockResponse));
    expect(result.current.success).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("should return error correctly when calling fetchTransactions and the service fails", async () => {
    (listTransactions as jest.Mock).mockRejectedValue(new Error("Erro na API"));
    const { result } = renderHook(() => useGetTransactions());

    await act(async () => {
      result.current.fetchTransactions();
    });

    await waitFor(() => expect(result.current.error).toBe("Erro ao puxar a lista de transações. Por favor, tente novamente."));
    expect(result.current.data).toBeNull();
    expect(result.current.success).toBe(false);
    expect(result.current.loading).toBe(false);
  });

  it("should call fetchTransactions again when refetch is executed after an error", async () => {
    (listTransactions as jest.Mock).mockRejectedValueOnce(new Error("Erro na API"));
    const { result } = renderHook(() => useGetTransactions());

    await act(async () => {
      result.current.fetchTransactions();
    });

    await waitFor(() => expect(result.current.error).toBe("Erro ao puxar a lista de transações. Por favor, tente novamente."));

    (listTransactions as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    await act(async () => {
      result.current.refetch();
    });

    await waitFor(() => expect(result.current.data).toEqual(mockResponse));
    expect(result.current.error).toBeNull();
    expect(result.current.success).toBe(true);
  });
});
