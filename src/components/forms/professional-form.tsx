"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { professionalSchema } from "@/lib/validations"
import type { Professional } from "@/types"

type ProfessionalFormData = z.infer<typeof professionalSchema>

interface ProfessionalFormProps {
  professional?: Professional
  onSubmit: (data: ProfessionalFormData) => void
  onCancel?: () => void
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

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
  "18:00",
]

export function ProfessionalForm({ professional, onSubmit, onCancel }: ProfessionalFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProfessionalFormData>({
    resolver: zodResolver(professionalSchema),
    defaultValues: professional
      ? {
          name: professional.name,
          email: professional.email,
          specialty: professional.specialty,
          phone: professional.phone,
          daysAvailable: professional.daysAvailable,
          timeSlots: professional.timeSlots,
        }
      : {
          daysAvailable: [],
          timeSlots: [],
        },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" {...register("name")} className={errors.name ? "border-red-500" : ""} />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialty">Specialty *</Label>
          <Input id="specialty" {...register("specialty")} className={errors.specialty ? "border-red-500" : ""} />
          {errors.specialty && <p className="text-sm text-red-500">{errors.specialty.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" {...register("email")} className={errors.email ? "border-red-500" : ""} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" {...register("phone")} className={errors.phone ? "border-red-500" : ""} />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Available Days *</Label>
        <Controller
          name="daysAvailable"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-4 gap-3">
              {daysOfWeek.map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={day}
                    checked={field.value.includes(day)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange([...field.value, day])
                      } else {
                        field.onChange(field.value.filter((d) => d !== day))
                      }
                    }}
                  />
                  <Label htmlFor={day} className="text-sm">
                    {day}
                  </Label>
                </div>
              ))}
            </div>
          )}
        />
        {errors.daysAvailable && <p className="text-sm text-red-500">{errors.daysAvailable.message}</p>}
      </div>

      <div className="space-y-3">
        <Label>Available Time Slots *</Label>
        <Controller
          name="timeSlots"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto border rounded-lg p-3">
              {timeSlots.map((time) => (
                <div key={time} className="flex items-center space-x-2">
                  <Checkbox
                    id={time}
                    checked={field.value.includes(time)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange([...field.value, time])
                      } else {
                        field.onChange(field.value.filter((t) => t !== time))
                      }
                    }}
                  />
                  <Label htmlFor={time} className="text-xs">
                    {time}
                  </Label>
                </div>
              ))}
            </div>
          )}
        />
        {errors.timeSlots && <p className="text-sm text-red-500">{errors.timeSlots.message}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : professional ? "Update Professional" : "Add Professional"}
        </Button>
      </div>
    </form>
  )
}
