export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "ODONT" | "RECEP";
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  dateOfBirth?: string;
  medicalHistory?: string;
}

export interface Professional {
  id: string;
  name: string;
  email: string;
  specialty: string;
  phone: string;
  daysAvailable: string[];
  timeSlots: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  professionalId: string;
  date: string;
  time: string;
  duration: number;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  notes?: string;
}

export interface Invoice {
  id: string;
  appointmentId: string;
  amount: number;
  paid: boolean;
  dueDate: string;
  description: string;
}
