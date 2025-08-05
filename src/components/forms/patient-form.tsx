"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { patientSchema } from "@/lib/validations"
import type { Patient } from "@/types"

type PatientFormData = z.infer<typeof patientSchema>

interface PatientFormProps {
  patient?: Patient
  onSubmit: (data: PatientFormData) => void
  onCancel?: () => void
}

export function PatientForm({ patient, onSubmit, onCancel }: PatientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: patient
      ? {
          name: patient.name,
          email: patient.email,
          phone: patient.phone,
          address: patient.address || "",
          dateOfBirth: patient.dateOfBirth || "",
          medicalHistory: patient.medicalHistory || "",
        }
      : undefined,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" {...register("name")} className={errors.name ? "border-red-500" : ""} />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" {...register("email")} className={errors.email ? "border-red-500" : ""} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" {...register("phone")} className={errors.phone ? "border-red-500" : ""} />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            {...register("dateOfBirth")}
            className={errors.dateOfBirth ? "border-red-500" : ""}
          />
          {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" {...register("address")} className={errors.address ? "border-red-500" : ""} />
        {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="medicalHistory">Medical History</Label>
        <Textarea
          id="medicalHistory"
          rows={3}
          {...register("medicalHistory")}
          className={errors.medicalHistory ? "border-red-500" : ""}
        />
        {errors.medicalHistory && <p className="text-sm text-red-500">{errors.medicalHistory.message}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : patient ? "Update Patient" : "Add Patient"}
        </Button>
      </div>
    </form>
  )
}
