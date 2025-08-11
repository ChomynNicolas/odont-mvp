import { z } from "zod"

export const invoiceSchema = z.object({
  appointmentId: z.string().min(1, "Appointment is required"),
  amount: z.number().min(0, "Amount must be positive"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due date is required"),
})

export type InvoiceInput = z.infer<typeof invoiceSchema>
