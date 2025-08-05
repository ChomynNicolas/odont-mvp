import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, UserCheck, Calendar, FileText, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"

// Mock data - replace with actual data fetching
const dashboardStats = {
  totalPatients: 1247,
  totalProfessionals: 12,
  upcomingAppointments: 23,
  pendingInvoices: 8,
  todayAppointments: 15,
  monthlyRevenue: 45600,
}

const recentAppointments = [
  { id: "1", patient: "John Smith", professional: "Dr. Johnson", time: "09:00", status: "confirmed" },
  { id: "2", patient: "Sarah Wilson", professional: "Dr. Brown", time: "10:30", status: "pending" },
  { id: "3", patient: "Mike Davis", professional: "Dr. Johnson", time: "14:00", status: "confirmed" },
]

const quickActions = [
  { title: "New Patient", href: "/patients", icon: Users, color: "bg-blue-500" },
  { title: "Schedule Appointment", href: "/schedule", icon: Calendar, color: "bg-green-500" },
  { title: "View Professionals", href: "/professionals", icon: UserCheck, color: "bg-purple-500" },
  { title: "Manage Invoices", href: "/invoices", icon: FileText, color: "bg-orange-500" },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/schedule">
              <Calendar className="w-4 h-4 mr-2" />
              View Schedule
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalPatients}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Professionals</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalProfessionals}</div>
            <p className="text-xs text-muted-foreground">Active staff members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Todays Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.todayAppointments}</div>
            <p className="text-xs text-muted-foreground">{dashboardStats.upcomingAppointments} upcoming this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.pendingInvoices}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {quickActions.map((action) => (
                <Button key={action.title} asChild variant="outline" className="justify-start h-12 bg-transparent">
                  <Link href={action.href}>
                    <div className={`w-8 h-8 rounded-md ${action.color} flex items-center justify-center mr-3`}>
                      <action.icon className="w-4 h-4 text-white" />
                    </div>
                    {action.title}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Todays Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{appointment.patient}</p>
                      <p className="text-sm text-muted-foreground">{appointment.professional}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{appointment.time}</p>
                    <Badge variant={appointment.status === "confirmed" ? "success" : "warning"}>
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
              <Link href="/schedule">View All Appointments</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
