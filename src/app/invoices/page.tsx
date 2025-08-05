"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, FileText, DollarSign, Calendar, User } from "lucide-react";
import type { Invoice } from "@/types";

// Mock data - replace with actual data fetching
const mockInvoices: Invoice[] = [
  {
    id: "1",
    appointmentId: "1",
    amount: 150.0,
    paid: true,
    dueDate: "2024-03-25",
    description: "Dental Checkup - John Smith",
  },
  {
    id: "2",
    appointmentId: "2",
    amount: 80.0,
    paid: false,
    dueDate: "2024-03-30",
    description: "Teeth Cleaning - Sarah Wilson",
  },
  {
    id: "3",
    appointmentId: "3",
    amount: 200.0,
    paid: true,
    dueDate: "2024-03-20",
    description: "Orthodontic Consultation - Mike Davis",
  },
  {
    id: "4",
    appointmentId: "4",
    amount: 120.0,
    paid: false,
    dueDate: "2024-04-05",
    description: "Dental Filling - Jane Doe",
  },
];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPaidOnly, setShowPaidOnly] = useState(false);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = invoice.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPaidFilter = showPaidOnly ? invoice.paid : true;
    return matchesSearch && matchesPaidFilter;
  });

  const handleTogglePaid = (id: string) => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.id === id ? { ...invoice, paid: !invoice.paid } : invoice
      )
    );
  };

  const totalAmount = filteredInvoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0
  );
  const paidAmount = filteredInvoices
    .filter((invoice) => invoice.paid)
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = totalAmount - paidAmount;

  const isOverdue = (dueDate: string) => {
    return (
      new Date(dueDate) < new Date() &&
      !invoices.find((inv) => inv.dueDate === dueDate)?.paid
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Paid Amount</p>
              <p className="text-2xl font-bold text-green-600">
                ${paidAmount.toFixed(2)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Pending Amount
              </p>
              <p className="text-2xl font-bold text-orange-600">
                ${pendingAmount.toFixed(2)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="paid-only"
            checked={showPaidOnly}
            onCheckedChange={setShowPaidOnly}
          />
          <label htmlFor="paid-only" className="text-sm">
            Show paid only
          </label>
        </div>
        <Badge variant="secondary">
          {filteredInvoices.length} invoice
          {filteredInvoices.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{invoice.description}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  ${invoice.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span
                      className={
                        isOverdue(invoice.dueDate) ? "text-red-600" : ""
                      }
                    >
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={invoice.paid}
                      onCheckedChange={() => handleTogglePaid(invoice.id)}
                      size="sm"
                    />
                    <Badge variant={invoice.paid ? "success" : "warning"}>
                      {invoice.paid ? "Paid" : "Pending"}
                    </Badge>
                    {isOverdue(invoice.dueDate) && !invoice.paid && (
                      <Badge variant="destructive">Overdue</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredInvoices.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No invoices found.</p>
        </div>
      )}
    </div>
  );
}
