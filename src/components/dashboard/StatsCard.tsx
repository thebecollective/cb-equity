interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  change?: string
  color?: string
}

export default function StatsCard({ title, value, icon, change, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-start gap-4">
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center text-xl shrink-0"
        style={{ backgroundColor: color ? `${color}15` : '#1e3a5f15', color: color || '#1e3a5f' }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {change && (
          <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-600' : change.startsWith('-') ? 'text-red-600' : 'text-gray-500'}`}>
            {change}
          </p>
        )}
      </div>
    </div>
  )
}
