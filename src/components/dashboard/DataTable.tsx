export interface Column<T> {
  key: string
  label: string
  render?: (item: T) => React.ReactNode
}


interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onEdit?: (item: T) => void
  onDelete?: (id: string) => void
}

export default function DataTable<T extends { id?: string }>({
  columns,
  data,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-400 text-sm font-medium">No data found</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {columns.map((col) => (
                <th key={col.key} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-gray-700">
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="px-3 py-1.5 text-xs font-medium text-[#1e3a5f] bg-[#1e3a5f]/5 hover:bg-[#1e3a5f]/10 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item.id!)}
                          className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
