import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(["ADMIN", "ODONT", "RECEP"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export const patientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  medicalHistory: z.string().optional(),
});

export const professionalSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  specialty: z.string().min(2, "Specialty is required"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  daysAvailable: z.array(z.string()).min(1, "Select at least one day"),
  timeSlots: z.array(z.string()).min(1, "Select at least one time slot"),
});

export const appointmentSchema = z.object({
  patientId: z.string().min(1, "Patient is required"),
  professionalId: z.string().min(1, "Professional is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.number().min(15, "Duration must be at least 15 minutes"),
  notes: z.string().optional(),
});
