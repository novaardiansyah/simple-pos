"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CreditCardIcon, WalletIcon, ReceiptTextIcon, PackageXIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
  variant?: "primary" | "secondary" | "default" | "warning"
}

function StatCard({ title, value, subtitle, icon, variant = "default" }: StatCardProps) {
  const variantClasses = {
    primary: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white",
    secondary: "bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 text-white",
    default: "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-white",
    warning: "bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 text-white",
  }

  const subtitleClasses = {
    primary: "text-blue-200",
    secondary: "text-teal-200",
    default: "text-amber-200",
    warning: "text-rose-200",
  }

  const iconClasses = {
    primary: "text-white/70",
    secondary: "text-white/70",
    default: "text-white/70",
    warning: "text-white/70",
  }

  const titleClasses = {
    primary: "text-white/80",
    secondary: "text-white/80",
    default: "text-white/80",
    warning: "text-white/80",
  }

  return (
    <Card className={`${variantClasses[variant]} shadow-sm hover:shadow-xl transition-shadow duration-300 py-0 rounded-2xl overflow-hidden`}>
      <CardContent className="px-5 py-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <p className={`text-sm font-medium ${titleClasses[variant]}`}>
              {title}
            </p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            <p className={`text-xs ${subtitleClasses[variant]}`}>{subtitle}</p>
          </div>
          <div className={`${iconClasses[variant]} p-2 rounded-xl bg-white/10`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Pendapatan"
        value={formatCurrency(111000)}
        subtitle="Hari ini"
        icon={<WalletIcon className="h-5 w-5" />}
        variant="primary"
      />
      <StatCard
        title="Laba Bersih"
        value={formatCurrency(100000)}
        subtitle="Setelah Modal & PPN"
        icon={<CreditCardIcon className="h-5 w-5" />}
        variant="secondary"
      />
      <StatCard
        title="Transaksi"
        value="3"
        subtitle="Nota tercetak"
        icon={<ReceiptTextIcon className="h-5 w-5" />}
        variant="default"
      />
      <StatCard
        title="Stok Menipis"
        value="0"
        subtitle="Perlu Restock!"
        icon={<PackageXIcon className="h-5 w-5" />}
        variant="warning"
      />
    </div>
  )
}
