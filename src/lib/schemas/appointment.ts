import { z } from "zod"

export const appointmentSchema = z.object({
  patientId: z.string().min(1, "Patient is required"),
  professionalId: z.string().min(1, "Professional is required"),
  appointmentType: z.enum([
    "CONSULTATION",
    "CLEANING", 
    "FILLING",
    "EXTRACTION",
    "ROOT_CANAL",
    "ORTHODONTICS",
    "PERIODONTICS",
    "PROSTHODONTICS",
    "EMERGENCY",
    "WHITENING"
  ]),
  scheduledAt: z.string().min(1, "Date and time is required"),
  duration: z.number().min(15, "Duration must be at least 15 minutes"),
  notes: z.string().optional(),
})

export type AppointmentInput = z.infer<typeof appointmentSchema>
