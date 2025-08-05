"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { appointmentSchema } from "@/lib/validations"
import type { Appointment } from "@/types"

type AppointmentFormData = z.infer<typeof appointmentSchema>

interface AppointmentFormProps {
  appointment?: Appointment
  onSubmit: (data: AppointmentFormData) => void
  onCancel?: () => void
}

// Mock data for dropdowns
const mockPatients = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Sarah Wilson" },
  { id: "3", name: "Mike Davis" },
]

const mockProfessionals = [
  { id: "1", name: "Dr. Sarah Johnson" },
  { id: "2", name: "Dr. Michael Brown" },
  { id: "3", name: "Dr. Emily Davis" },
]

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

export function AppointmentForm({ appointment, onSubmit, onCancel }: AppointmentFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: appointment
      ? {
          patientId: appointment.patientId,
          professionalId: appointment.professionalId,
          date: appointment.date,
          time: appointment.time,
          duration: appointment.duration,
          notes: appointment.notes || "",
        }
      : {
          duration: 30,
        },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="patientId">Patient *</Label>
          <Select onValueChange={(value) => setValue("patientId", value)}>
            <SelectTrigger className={errors.patientId ? "border-red-500" : ""}>
              <SelectValue placeholder="Select patient" />
            </SelectTrigger>
            <SelectContent>
              {mockPatients.map((patient) => (
                <SelectItem key={patient.id} value={patient.id}>
                  {patient.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.patientId && <p className="text-sm text-red-500">{errors.patientId.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="professionalId">Professional *</Label>
          <Select onValueChange={(value) => setValue("professionalId", value)}>
            <SelectTrigger className={errors.professionalId ? "border-red-500" : ""}>
              <SelectValue placeholder="Select professional" />
            </SelectTrigger>
            <SelectContent>
              {mockProfessionals.map((professional) => (
                <SelectItem key={professional.id} value={professional.id}>
                  {professional.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.professionalId && <p className="text-sm text-red-500">{errors.professionalId.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input id="date" type="date" {...register("date")} className={errors.date ? "border-red-500" : ""} />
          {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time *</Label>
          <Select onValueChange={(value) => setValue("time", value)}>
            <SelectTrigger className={errors.time ? "border-red-500" : ""}>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.time && <p className="text-sm text-red-500">{errors.time.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes) *</Label>
          <Select onValueChange={(value) => setValue("duration", Number.parseInt(value))}>
            <SelectTrigger className={errors.duration ? "border-red-500" : ""}>
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="90">1.5 hours</SelectItem>
              <SelectItem value="120">2 hours</SelectItem>
            </SelectContent>
          </Select>
          {errors.duration && <p className="text-sm text-red-500">{errors.duration.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          rows={3}
          placeholder="Additional notes about the appointment..."
          {...register("notes")}
          className={errors.notes ? "border-red-500" : ""}
        />
        {errors.notes && <p className="text-sm text-red-500">{errors.notes.message}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : appointment ? "Update Appointment" : "Schedule Appointment"}
        </Button>
      </div>
    </form>
  )
}
