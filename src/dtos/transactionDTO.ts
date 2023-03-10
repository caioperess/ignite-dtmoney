export interface TransactionDTO {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

export type TransactionInput = Omit<TransactionDTO, "id" | "createdAt">;
