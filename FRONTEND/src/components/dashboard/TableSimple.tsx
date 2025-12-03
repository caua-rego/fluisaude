import type { ReactNode } from 'react'

type Column<T> = { key: keyof T; header: string }

type Props<T> = {
  columns: Column<T>[]
  data: T[]
  renderActions?: (row: T) => ReactNode
  actionHeader?: string
}

export default function TableSimple<T extends Record<string, any>>({ columns, data, renderActions, actionHeader = '' }: Props<T>) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-50">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((c) => (
              <th key={String(c.key)} className="text-left px-4 py-3 text-gray-600">{c.header}</th>
            ))}
            {renderActions && <th className="px-4 py-3 text-right text-gray-500">{actionHeader}</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-t last:border-b hover:bg-gray-50">
              {columns.map((c) => (
                <td key={String(c.key)} className="px-4 py-3">{String(row[c.key])}</td>
              ))}
              {renderActions && <td className="px-4 py-3 text-right space-x-2">{renderActions(row)}</td>}
            </tr>
          ))}
          {!data.length && (
            <tr>
              <td colSpan={columns.length + (renderActions ? 1 : 0)} className="px-4 py-6 text-center text-gray-400">
                Nenhum registro encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
