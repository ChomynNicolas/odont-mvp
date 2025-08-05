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
import { ProfessionalForm } from "@/components/forms/professional-form";
import type { Professional } from "@/types";

// Mock data - replace with actual data fetching
const mockProfessionals: Professional[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@dentalcare.com",
    specialty: "General Dentistry",
    phone: "+1 (555) 123-4567",
    daysAvailable: ["Monday", "Tuesday", "Wednesday", "Friday"],
    timeSlots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
  },
  {
    id: "2",
    name: "Dr. Michael Brown",
    email: "michael.brown@dentalcare.com",
    specialty: "Orthodontics",
    phone: "+1 (555) 987-6543",
    daysAvailable: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    timeSlots: ["08:00", "09:00", "10:00", "13:00", "14:00", "15:00"],
  },
  {
    id: "3",
    name: "Dr. Emily Davis",
    email: "emily.davis@dentalcare.com",
    specialty: "Oral Surgery",
    phone: "+1 (555) 456-7890",
    daysAvailable: ["Monday", "Wednesday", "Thursday"],
    timeSlots: ["09:00", "10:30", "13:00", "14:30"],
  },
];

export default function ProfessionalsPage() {
  const [professionals, setProfessionals] =
    useState<Professional[]>(mockProfessionals);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProfessionals = professionals.filter(
    (professional) =>
      professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProfessional = (newProfessional: Omit<Professional, "id">) => {
    const professional: Professional = {
      ...newProfessional,
      id: Date.now().toString(),
    };
    setProfessionals([...professionals, professional]);
    setIsModalOpen(false);
  };

  const handleDeleteProfessional = (id: string) => {
    if (confirm("Are you sure you want to delete this professional?")) {
      setProfessionals(professionals.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Professionals</h1>
        <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
          <ModalTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Professional
            </Button>
          </ModalTrigger>
          <ModalContent className="max-w-2xl">
            <ModalHeader>
              <ModalTitle>Add New Professional</ModalTitle>
              <ModalDescription>
                Enter the professionals information and availability.
              </ModalDescription>
            </ModalHeader>
            <ProfessionalForm onSubmit={handleAddProfessional} />
          </ModalContent>
        </Modal>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search professionals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Badge variant="secondary">
          {filteredProfessionals.length} professional
          {filteredProfessionals.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProfessionals.map((professional) => (
              <TableRow key={professional.id}>
                <TableCell className="font-medium">
                  {professional.name}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{professional.specialty}</Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-3 h-3" />
                      {professional.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-3 h-3" />
                      {professional.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {professional.daysAvailable.slice(0, 3).map((day) => (
                      <Badge key={day} variant="secondary" className="text-xs">
                        {day.slice(0, 3)}
                      </Badge>
                    ))}
                    {professional.daysAvailable.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{professional.daysAvailable.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/professionals/${professional.id}`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProfessional(professional.id)}
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

      {filteredProfessionals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No professionals found.</p>
        </div>
      )}
    </div>
  );
}
