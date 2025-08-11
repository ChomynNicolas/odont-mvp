import { z } from "zod"

export const patientSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  medicalHistory: z.string().optional(),
  emergencyContact: z.string().optional(),
})

export type PatientInput = z.infer<typeof patientSchema>
