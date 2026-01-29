"use client"

import { MainLayout } from "@/components/main-layout"
import { ChartLineInteractive } from "@/components/main/chartIncome"
import { DashboardStats } from "@/components/main/dashboardStats"
import { TopMenu } from "@/components/main/topMenu"
import { withAuth } from "@/lib/withAuth"
import { useLanguage } from "@/components/language-provider"

const DashboardPage = () => {
  const { t } = useLanguage()

  return (
    <MainLayout
      breadcrumbs={[
        { label: t.dashboard.breadcrumbs.general, href: "/" },
        { label: t.dashboard.breadcrumbs.dashboard }
      ]}
    >
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="lg:col-span-2">
          <ChartLineInteractive />
        </div>
        <div className="lg:col-span-1">
          <TopMenu />
        </div>
      </div>
    </MainLayout>
  )
}

export default withAuth(DashboardPage)

