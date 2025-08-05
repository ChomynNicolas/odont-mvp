"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Trash2, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { ProfessionalForm } from "@/components/forms/professional-form";
import type { Professional } from "@/types";

// Mock data - replace with actual data fetching
const mockProfessional: Professional = {
  id: "1",
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@dentalcare.com",
  specialty: "General Dentistry",
  phone: "+1 (555) 123-4567",
  daysAvailable: ["Monday", "Tuesday", "Wednesday", "Friday"],
  timeSlots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
};

export default function ProfessionalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProfessional(mockProfessional);
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  const handleUpdateProfessional = (updatedData: Omit<Professional, "id">) => {
    if (professional) {
      setProfessional({ ...professional, ...updatedData });
      setIsEditing(false);
    }
  };

  const handleDeleteProfessional = () => {
    if (
      confirm(
        "Are you sure you want to delete this professional? This action cannot be undone."
      )
    ) {
      // Handle delete logic here
      router.push("/professionals");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Professional not found.</p>
        <Button asChild className="mt-4">
          <Link href="/professionals">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Professionals
          </Link>
        </Button>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <h1 className="text-3xl font-bold">Edit Professional</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfessionalForm
              professional={professional}
              onSubmit={handleUpdateProfessional}
              onCancel={() => setIsEditing(false)}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link href="/professionals">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{professional.name}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDeleteProfessional}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Specialty
              </label>
              <p className="text-sm">
                <Badge variant="outline">{professional.specialty}</Badge>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-sm">{professional.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <p className="text-sm">{professional.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Available Days
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {professional.daysAvailable.map((day) => (
                  <Badge key={day} variant="secondary">
                    {day}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Time Slots
              </label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {professional.timeSlots.map((time) => (
                  <Badge
                    key={time}
                    variant="outline"
                    className="text-xs justify-center"
                  >
                    {time}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Todays Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-medium">09:00 - 09:30</p>
                    <p className="text-sm text-gray-500">
                      John Smith - Checkup
                    </p>
                  </div>
                </div>
                <Badge variant="success">Confirmed</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-medium">10:00 - 10:30</p>
                    <p className="text-sm text-gray-500">
                      Sarah Wilson - Cleaning
                    </p>
                  </div>
                </div>
                <Badge variant="warning">Pending</Badge>
              </div>
            </div>
            <Button
              asChild
              variant="outline"
              className="w-full mt-4 bg-transparent"
            >
              <Link href="/schedule">
                <Calendar className="w-4 h-4 mr-2" />
                View Full Schedule
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Appointments This Week
              </span>
              <span className="font-medium">24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Appointments This Month
              </span>
              <span className="font-medium">96</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Average Rating</span>
              <span className="font-medium">4.8/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Total Patients</span>
              <span className="font-medium">342</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
