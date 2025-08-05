"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2, Calendar, FileText } from "lucide-react"
import Link from "next/link"
import { PatientForm } from "@/components/forms/patient-form"
import type { Patient } from "@/types"

// Mock data - replace with actual data fetching
const mockPatient: Patient = {
  id: "1",
  name: "John Smith",
  email: "john.smith@email.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, City, State 12345",
  dateOfBirth: "1985-06-15",
  medicalHistory: "No known allergies. Previous dental work includes fillings and cleaning.",
}

export default function PatientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPatient(mockPatient)
      setIsLoading(false)
    }, 500)
  }, [params.id])

  const handleUpdatePatient = (updatedData: Omit<Patient, "id">) => {
    if (patient) {
      setPatient({ ...patient, ...updatedData })
      setIsEditing(false)
    }
  }

  const handleDeletePatient = () => {
    if (confirm("Are you sure you want to delete this patient? This action cannot be undone.")) {
      // Handle delete logic here
      router.push("/patients")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Patient not found.</p>
        <Button asChild className="mt-4">
          <Link href="/patients">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Patients
          </Link>
        </Button>
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <h1 className="text-3xl font-bold">Edit Patient</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <PatientForm patient={patient} onSubmit={handleUpdatePatient} onCancel={() => setIsEditing(false)} />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link href="/patients">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{patient.name}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDeletePatient}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-sm">{patient.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <p className="text-sm">{patient.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Date of Birth</label>
              <p className="text-sm">
                {patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : "Not provided"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Address</label>
              <p className="text-sm">{patient.address || "Not provided"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">{patient.medicalHistory || "No medical history recorded."}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Routine Cleaning</p>
                  <p className="text-sm text-gray-500">Dr. Johnson • March 15, 2024</p>
                </div>
                <Badge variant="success">Completed</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Dental Checkup</p>
                  <p className="text-sm text-gray-500">Dr. Johnson • April 20, 2024</p>
                </div>
                <Badge variant="default">Scheduled</Badge>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
              <Link href="/schedule">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Appointment
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Treatment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Dental Filling</p>
                <p className="text-sm text-gray-500">February 10, 2024 • $150.00</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Teeth Cleaning</p>
                <p className="text-sm text-gray-500">January 15, 2024 • $80.00</p>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
              <Link href="/invoices">
                <FileText className="w-4 h-4 mr-2" />
                View All Invoices
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
