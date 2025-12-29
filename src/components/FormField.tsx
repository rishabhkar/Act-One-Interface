import type { ReactNode } from 'react'

export type FieldProps = {
  id: string
  label: string
  required?: boolean
  type?: React.HTMLInputTypeAttribute
  value: string
  onChange: (v: string) => void
  placeholder?: string
  error?: string
  as?: 'input' | 'textarea'
  rows?: number
  rightSlot?: ReactNode
}

export default function FormField({
  id,
  label,
  required,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  as = 'input',
  rows = 5,
  rightSlot,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="label">
          {label} {required ? <span className="text-white/50">*</span> : null}
        </label>
        {rightSlot}
      </div>

      {as === 'textarea' ? (
        <textarea
          id={id}
          className="field min-h-[120px] resize-y"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          required={required}
        />
      ) : (
        <input
          id={id}
          className="field"
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
      )}

      <div
        className={
          'transition-all duration-200 ' + (error ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0')
        }
        aria-live="polite"
      >
        {error ? <div className="error">{error}</div> : null}
      </div>
    </div>
  )
}
