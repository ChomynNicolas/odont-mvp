export interface User {
  id: string
  email: string
  name: string | null
  role: "ADMIN" | "ODONT" | "RECEP"
  createdAt: Date
}

export interface Patient {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string | null
  dateOfBirth: Date | null
  medicalHistory: string | null
  emergencyContact: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Professional {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  specialty: string
  licenseNumber: string
  createdAt: Date
  updatedAt: Date
  availability: Availability[]
}

export interface Availability {
  id: string
  professionalId: string
  dayOfWeek: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN"
  startTime: string
  endTime: string
  isActive: boolean
}

export interface Appointment {
  id: string
  patientId: string
  professionalId: string
  appointmentType: "CONSULTATION" | "CLEANING" | "FILLING" | "EXTRACTION" | "ROOT_CANAL" | "ORTHODONTICS" | "PERIODONTICS" | "PROSTHODONTICS" | "EMERGENCY" | "WHITENING"
  scheduledAt: Date
  duration: number
  status: "SCHEDULED" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "NO_SHOW"
  notes: string | null
  createdAt: Date
  updatedAt: Date
  patient: Patient
  professional: Professional
}

export interface Invoice {
  id: string
  appointmentId: string
  amount: number
  description: string
  isPaid: boolean
  dueDate: Date
  paidAt: Date | null
  createdAt: Date
  updatedAt: Date
  appointment: Appointment
}
