import React, { createContext, useContext, useEffect, useState } from "react";
import { TransactionDTO, TransactionInput } from "../dtos/transactionDTO";
import { api } from "../services/api";

interface TransactionsProviderProps {
  children: React.ReactNode;
}

interface TransactionsContextData {
  transactions: TransactionDTO[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transaction: TransactionInput) {
    const createTransactionResponse = await api.post(
      "/transactions",
      transaction
    );

    setTransactions((oldTransaction) => [
      ...oldTransaction,
      createTransactionResponse.data.transaction,
    ]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
