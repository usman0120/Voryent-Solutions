import * as z from "zod";

export const transactionSchema = z.object({
  type: z.enum(["Income", "Expense"]).default("Income"),
  category: z.enum([
    "Sales",
    "Subscription",
    "Investment",
    "Payroll",
    "Software",
    "Marketing",
    "Office",
    "Legal",
    "Travel",
    "Other"
  ]).default("Other"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  currency: z.string().default("USD"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(2, "Description is required"),
  status: z.enum(["Pending", "Completed", "Cancelled"]).default("Completed"),
  reference: z.string().optional(),
  receiptUrl: z.string().optional(),
  notes: z.string().optional(),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
