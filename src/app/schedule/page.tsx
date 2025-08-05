"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { Plus, Calendar, Clock, User, UserCheck } from "lucide-react";
import { AppointmentForm } from "@/components/forms/appointment-form";
import type { Appointment } from "@/types";

// Mock data - replace with actual data fetching
const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientId: "1",
    professionalId: "1",
    date: "2024-03-20",
    time: "09:00",
    duration: 30,
    status: "SCHEDULED",
    notes: "Routine checkup",
  },
  {
    id: "2",
    patientId: "2",
    professionalId: "1",
    date: "2024-03-20",
    time: "10:00",
    duration: 60,
    status: "SCHEDULED",
    notes: "Dental cleaning",
  },
  {
    id: "3",
    patientId: "3",
    professionalId: "2",
    date: "2024-03-20",
    time: "14:00",
    duration: 45,
    status: "COMPLETED",
    notes: "Orthodontic consultation",
  },
];

// Mock patient and professional data for display
const mockPatients = {
  "1": "John Smith",
  "2": "Sarah Wilson",
  "3": "Mike Davis",
};

const mockProfessionals = {
  "1": "Dr. Sarah Johnson",
  "2": "Dr. Michael Brown",
};

export default function SchedulePage() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleAddAppointment = (
    newAppointment: Omit<Appointment, "id" | "status">
  ) => {
    const appointment: Appointment = {
      ...newAppointment,
      id: Date.now().toString(),
      status: "SCHEDULED",
    };
    setAppointments([...appointments, appointment]);
    setIsModalOpen(false);
  };

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.date === selectedDate
  );

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "SCHEDULED":
        return "default";
      case "COMPLETED":
        return "success";
      case "CANCELLED":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Schedule</h1>
        <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
          <ModalTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Appointment
            </Button>
          </ModalTrigger>
          <ModalContent className="max-w-2xl">
            <ModalHeader>
              <ModalTitle>Schedule New Appointment</ModalTitle>
              <ModalDescription>
                Fill in the appointment details below.
              </ModalDescription>
            </ModalHeader>
            <AppointmentForm onSubmit={handleAddAppointment} />
          </ModalContent>
        </Modal>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
        </div>
        <Badge variant="secondary">
          {filteredAppointments.length} appointment
          {filteredAppointments.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {/* Calendar placeholder - In a real app, you'd integrate with a calendar library */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 mb-2">
              Calendar integration placeholder
            </p>
            <p className="text-sm text-gray-400">
              In a real application, this would show a full calendar view with
              FullCalendar or similar library.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">
          Appointments for {new Date(selectedDate).toLocaleDateString()}
        </h2>

        {filteredAppointments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Clock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">
                No appointments scheduled for this date.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredAppointments
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="font-medium">
                            {appointment.time} ({appointment.duration} min)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span>
                            {
                              mockPatients[
                                appointment.patientId as keyof typeof mockPatients
                              ]
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-gray-500" />
                          <span>
                            {
                              mockProfessionals[
                                appointment.professionalId as keyof typeof mockProfessionals
                              ]
                            }
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(appointment.status)}>
                          {appointment.status.toLowerCase()}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    {appointment.notes && (
                      <p className="text-sm text-gray-600 mt-2">
                        {appointment.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
