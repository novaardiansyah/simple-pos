"use client"

import { MainLayout } from "@/components/main-layout"
import { withAuth } from "@/lib/withAuth"
import { useLanguage } from "@/components/language-provider"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CalendarIcon, X } from "lucide-react"
import { useState, useMemo } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface Member {
  id: string
  name: string
  email: string
  phone: string
  address: string
  joinDate: string
}

const dummyMembers: Member[] = [
  { id: "1", name: "John Doe", email: "john.doe@example.com", phone: "+62 812-3456-7890", address: "Jl. Merdeka No. 1, Jakarta", joinDate: "2024-01-15" },
  { id: "2", name: "Jane Smith", email: "jane.smith@example.com", phone: "+62 813-4567-8901", address: "Jl. Sudirman No. 25, Bandung", joinDate: "2024-02-20" },
  { id: "3", name: "Robert Johnson", email: "robert.johnson@example.com", phone: "+62 814-5678-9012", address: "Jl. Thamrin No. 10, Surabaya", joinDate: "2024-03-05" },
  { id: "4", name: "Emily Davis", email: "emily.davis@example.com", phone: "+62 815-6789-0123", address: "Jl. Gatot Subroto No. 8, Medan", joinDate: "2024-03-12" },
  { id: "5", name: "Michael Wilson", email: "michael.wilson@example.com", phone: "+62 816-7890-1234", address: "Jl. Diponegoro No. 15, Semarang", joinDate: "2024-04-01" },
  { id: "6", name: "Sarah Brown", email: "sarah.brown@example.com", phone: "+62 817-8901-2345", address: "Jl. Ahmad Yani No. 20, Yogyakarta", joinDate: "2024-04-18" },
  { id: "7", name: "David Miller", email: "david.miller@example.com", phone: "+62 818-9012-3456", address: "Jl. Pahlawan No. 5, Malang", joinDate: "2024-05-02" },
  { id: "8", name: "Linda Garcia", email: "linda.garcia@example.com", phone: "+62 819-0123-4567", address: "Jl. Veteran No. 12, Denpasar", joinDate: "2024-05-15" },
  { id: "9", name: "James Martinez", email: "james.martinez@example.com", phone: "+62 821-1234-5678", address: "Jl. Pemuda No. 7, Makassar", joinDate: "2024-06-01" },
  { id: "10", name: "Patricia Anderson", email: "patricia.anderson@example.com", phone: "+62 822-2345-6789", address: "Jl. Kartini No. 18, Palembang", joinDate: "2024-06-20" },
  { id: "11", name: "Christopher Thomas", email: "chris.thomas@example.com", phone: "+62 823-3456-7890", address: "Jl. Hayam Wuruk No. 9, Balikpapan", joinDate: "2024-07-05" },
  { id: "12", name: "Jennifer Jackson", email: "jennifer.jackson@example.com", phone: "+62 824-4567-8901", address: "Jl. Gajah Mada No. 22, Pontianak", joinDate: "2024-07-18" },
  { id: "13", name: "Daniel White", email: "daniel.white@example.com", phone: "+62 825-5678-9012", address: "Jl. Imam Bonjol No. 3, Manado", joinDate: "2024-08-01" },
  { id: "14", name: "Jessica Harris", email: "jessica.harris@example.com", phone: "+62 826-6789-0123", address: "Jl. Cut Nyak Dien No. 14, Padang", joinDate: "2024-08-15" },
  { id: "15", name: "Matthew Clark", email: "matthew.clark@example.com", phone: "+62 827-7890-1234", address: "Jl. Teuku Umar No. 6, Banjarmasin", joinDate: "2024-09-01" },
]

const MembersPage = () => {
  const { t } = useLanguage()
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [appliedStartDate, setAppliedStartDate] = useState<Date | undefined>(undefined)
  const [appliedEndDate, setAppliedEndDate] = useState<Date | undefined>(undefined)

  const columns: ColumnDef<Member>[] = [
    {
      accessorKey: "name",
      header: t.members.columns.name,
    },
    {
      accessorKey: "email",
      header: t.members.columns.email,
    },
    {
      accessorKey: "phone",
      header: t.members.columns.phone,
    },
    {
      accessorKey: "address",
      header: t.members.columns.address,
    },
    {
      accessorKey: "joinDate",
      header: t.members.columns.joinDate,
      cell: ({ row }) => {
        const date = new Date(row.getValue("joinDate"))
        return date.toLocaleDateString()
      },
    },
  ]

  const filteredData = useMemo(() => {
    if (!appliedStartDate && !appliedEndDate) return dummyMembers
    return dummyMembers.filter((member) => {
      const joinDate = new Date(member.joinDate)
      if (appliedStartDate && joinDate < appliedStartDate) return false
      if (appliedEndDate && joinDate > appliedEndDate) return false
      return true
    })
  }, [appliedStartDate, appliedEndDate])

  const handleApplyFilter = () => {
    setAppliedStartDate(startDate)
    setAppliedEndDate(endDate)
  }

  const handleClearFilter = () => {
    setStartDate(undefined)
    setEndDate(undefined)
    setAppliedStartDate(undefined)
    setAppliedEndDate(undefined)
  }

  const filterContent = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="font-medium pb-2">{t.members.filter.joinDateRange}</Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">{t.members.filter.startDate}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PP") : t.members.filter.selectDate}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">{t.members.filter.endDate}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PP") : t.members.filter.selectDate}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {(startDate || endDate) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setStartDate(undefined)
              setEndDate(undefined)
            }}
            className="w-full"
          >
            <X className="h-4 w-4 mr-1" />
            {t.members.toolbar.clearDate}
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <MainLayout
      breadcrumbs={[
        { label: t.members.breadcrumbs.general, href: "/members" },
        { label: t.members.breadcrumbs.members }
      ]}
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5" />
            {t.members.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredData}
            searchPlaceholder={t.members.searchPlaceholder}
            searchKey="name"
            noResultsText={t.members.noResults}
            paginationLabels={t.members.pagination}
            toolbarLabels={t.members.toolbar}
            filterContent={filterContent}
            onApplyFilter={handleApplyFilter}
            onClearFilter={handleClearFilter}
          />
        </CardContent>
      </Card>
    </MainLayout>
  )
}

export default withAuth(MembersPage)
