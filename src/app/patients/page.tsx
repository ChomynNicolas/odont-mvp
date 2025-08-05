"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { Plus, Search, Edit, Trash2, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { PatientForm } from "@/components/forms/patient-form";
import type { Patient } from "@/types";

// Mock data - replace with actual data fetching
const mockPatients: Patient[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    dateOfBirth: "1985-06-15",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, City, State 12345",
    dateOfBirth: "1990-03-22",
  },
  {
    id: "3",
    name: "Mike Davis",
    email: "mike.davis@email.com",
    phone: "+1 (555) 456-7890",
    address: "789 Pine St, City, State 12345",
    dateOfBirth: "1978-11-08",
  },
];

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
  );

  const handleAddPatient = (newPatient: Omit<Patient, "id">) => {
    const patient: Patient = {
      ...newPatient,
      id: Date.now().toString(),
    };
    setPatients([...patients, patient]);
    setIsModalOpen(false);
  };

  const handleDeletePatient = (id: string) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      setPatients(patients.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Patients</h1>
        <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
          <ModalTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Patient
            </Button>
          </ModalTrigger>
          <ModalContent className="max-w-2xl">
            <ModalHeader>
              <ModalTitle>Add New Patient</ModalTitle>
              <ModalDescription>
                Enter the patients information below.
              </ModalDescription>
            </ModalHeader>
            <PatientForm onSubmit={handleAddPatient} />
          </ModalContent>
        </Modal>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Badge variant="secondary">
          {filteredPatients.length} patient
          {filteredPatients.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-3 h-3" />
                      {patient.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-3 h-3" />
                      {patient.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {patient.dateOfBirth
                    ? new Date(patient.dateOfBirth).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {patient.address || "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/patients/${patient.id}`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePatient(patient.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No patients found.</p>
        </div>
      )}
    </div>
  );
}
