import { Calendar, Train, Sparkles, type LightbulbIcon as LucideProps } from "lucide-react"

export const Icons = {
  logo: (props: LucideProps) => (
    <div className="flex items-center gap-1" {...props}>
      <Calendar className="h-5 w-5 text-purple-600" />
      <Train className="h-5 w-5 text-orange-600" />
      <Sparkles className="h-4 w-4 text-blue-500" />
    </div>
  ),
  event: Calendar,
  train: Train,
  sparkles: Sparkles,
}
