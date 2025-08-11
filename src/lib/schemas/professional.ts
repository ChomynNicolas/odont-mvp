import { z } from "zod"

export const professionalSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  specialty: z.string().min(2, "Specialty is required"),
  licenseNumber: z.string().min(1, "License number is required"),
})

export const availabilitySchema = z.object({
  dayOfWeek: z.enum(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  isActive: z.boolean().default(true),
})

export type ProfessionalInput = z.infer<typeof professionalSchema>
export type AvailabilityInput = z.infer<typeof availabilitySchema>
