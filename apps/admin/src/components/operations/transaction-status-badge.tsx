import { Badge } from "@/components/ui/badge";

interface TransactionStatusBadgeProps {
  status: string;
}

export function TransactionStatusBadge({ status }: TransactionStatusBadgeProps) {
  switch (status) {
    case "Pending":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
    case "Completed":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
    case "Cancelled":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
