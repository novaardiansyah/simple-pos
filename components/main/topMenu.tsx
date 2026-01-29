"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TrophyIcon } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const topMenuData = [
  { rank: 1, name: "Classic Cheeseburger", sold: 24 },
  { rank: 2, name: "Pepperoni Pizza", sold: 18 },
  { rank: 3, name: "Caesar Salad", sold: 12 },
  { rank: 4, name: "Grilled Salmon", sold: 9 },
  { rank: 5, name: "Iced Caramel Macchiato", sold: 7 },
  { rank: 6, name: "Chocolate Brownie", sold: 5 },
]

export function TopMenu() {
  const { t } = useLanguage()

  return (
    <Card className="h-full py-0">
      <CardHeader className="pb-0 pt-5">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrophyIcon className="h-5 w-5 text-amber-500" />
          {t.dashboard.topMenu.title}
        </CardTitle>
        <Separator className="mt-3" />
      </CardHeader>
      <CardContent className="pb-5">
        <div className="space-y-7">
          {topMenuData.map((item) => (
            <div key={item.rank} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                  item.rank === 1 ? "bg-blue-500 text-white" :
                  item.rank === 2 ? "bg-blue-400 text-white" :
                  item.rank === 3 ? "bg-blue-300 text-white" :
                  "bg-slate-200 text-slate-600"
                }`}>
                  {item.rank}
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate max-w-[140px]">
                  {item.name}
                </span>
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {item.sold} {t.dashboard.stats.sold}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

