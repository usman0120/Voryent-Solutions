import { CoreService, BaseEntity } from "./core.service";

export interface Transaction extends BaseEntity {
  type: "Income" | "Expense";
  category: "Sales" | "Subscription" | "Investment" | "Payroll" | "Software" | "Marketing" | "Office" | "Legal" | "Travel" | "Other";
  amount: number;
  currency: string;
  date: string;
  description: string;
  status: "Pending" | "Completed" | "Cancelled";
  reference?: string;
  receiptUrl?: string;
  notes?: string;
  createdBy?: string | null;
  updatedBy?: string | null;
}

export const financeService = new CoreService<Transaction>("finance");
export type { Transaction as TransactionType };
