import { type ReactNode, useState } from 'react'
import { ChevronDown } from 'lucide-react'

// ─── Glass Card Component ───
type GlassCardProps = {
  children: ReactNode
  className?: string
  elevated?: boolean
  noPadding?: boolean
}

export function MobileGlassCard({ children, className = '', elevated = false, noPadding = false }: GlassCardProps) {
  const baseClass = elevated ? 'mobile-glass-card-elevated' : 'mobile-glass-card'
  const paddingClass = noPadding ? '' : 'p-4'

  return <div className={`${baseClass} ${paddingClass} ${className}`}>{children}</div>
}

// ─── Section Header Component ───
type SectionHeaderProps = {
  title: string
  action?: { label: string; href: string }
  className?: string
}

export function MobileSectionHeader({ title, action, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <h2 className="mobile-section-header">{title}</h2>
      {action && (
        <a href={action.href} className="mobile-btn-text text-[#ff6a1a]">
          {action.label}
        </a>
      )}
    </div>
  )
}

// ─── Collapsible / Accordion Component ───
type CollapsibleProps = {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  className?: string
}

export function MobileCollapsible({ title, children, defaultOpen = false, className = '' }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={`mobile-glass-card overflow-hidden ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <span className="font-semibold text-white">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-white/60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && <div className="px-4 pb-4 text-sm text-white/75">{children}</div>}
    </div>
  )
}

// ─── Show Card Component (for mobile) ───
type ShowCardProps = {
  title: string
  date: string
  venue: string
  price: string
  seatsAvailable: number
  totalSeats: number
  posterUrl?: string
  onBook: () => void
  soldOut?: boolean
}

export function MobileShowCard({
  title,
  date,
  venue,
  price,
  seatsAvailable,
  totalSeats,
  posterUrl,
  onBook,
  soldOut = false,
}: ShowCardProps) {
  const seatPercent = totalSeats > 0 ? (seatsAvailable / totalSeats) * 100 : 0
  const seatColor = seatPercent > 30 ? 'text-green-400' : seatPercent > 10 ? 'text-yellow-400' : 'text-red-400'

  return (
    <div className="mobile-glass-card overflow-hidden">
      {/* Poster */}
      {posterUrl && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <img src={posterUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 mobile-image-overlay" />
          {soldOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <span className="text-red-500 font-bold text-2xl uppercase tracking-wider transform -rotate-12 border-4 border-red-500 px-4 py-2">
                Housefull
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold text-white">{title}</h3>

        <div className="space-y-1.5 text-sm">
          <p className="text-white/70">{date}</p>
          <p className="text-white/60">{venue}</p>
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">{price}</span>
            {!soldOut && (
              <span className={`text-sm ${seatColor}`}>
                {seatsAvailable} / {totalSeats} seats
              </span>
            )}
          </div>
        </div>

        {!soldOut ? (
          <button onClick={onBook} className="mobile-btn-primary w-full">
            Book Seats
          </button>
        ) : (
          <button disabled className="mobile-btn-secondary w-full opacity-50 cursor-not-allowed">
            Sold Out
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Member Avatar Card Component ───
type MemberAvatarProps = {
  name: string
  role?: string
  photoUrl: string
  onClick?: () => void
}

export function MobileMemberAvatar({ name, role, photoUrl, onClick }: MemberAvatarProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-colors min-w-[72px]"
    >
      <img
        src={photoUrl}
        alt={name}
        className="w-14 h-14 rounded-full object-cover border-2 border-white/10"
        loading="lazy"
      />
      <div className="text-center">
        <p className="text-xs text-white/90 font-medium line-clamp-1">{name}</p>
        {role && <p className="text-[10px] text-white/50 line-clamp-1">{role}</p>}
      </div>
    </button>
  )
}

// ─── Review Card Component ───
type ReviewCardProps = {
  title: string
  author: string
  source: string
  date: string
  excerpt: string
  linkUrl?: string
  linkLabel?: string
}

export function MobileReviewCard({ title, author, source, date, excerpt, linkUrl, linkLabel }: ReviewCardProps) {
  return (
    <article className="mobile-glass-card p-4 space-y-3">
      <h3 className="text-base font-semibold text-white leading-snug">{title}</h3>
      <p className="text-xs text-white/60">
        {author} · {source} · {date}
      </p>
      <p className="text-sm text-white/75 leading-relaxed line-clamp-3">{excerpt}</p>
      {linkUrl && (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-btn-text text-[#ff6a1a] !p-0"
        >
          {linkLabel || 'Read more'}
        </a>
      )}
    </article>
  )
}

// ─── Input Field Component ───
type InputFieldProps = {
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
  value: string
  onChange: (value: string) => void
  prefix?: string
  maxLength?: number
}

export function MobileInputField({
  label,
  type = 'text',
  placeholder,
  required = false,
  error,
  value,
  onChange,
  prefix,
  maxLength,
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-white/80">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff6a1a]/50 focus:ring-1 focus:ring-[#ff6a1a]/25 transition-colors ${
            prefix ? 'pl-12' : ''
          } ${error ? 'border-red-400/50' : 'border-white/10'}`}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

// ─── Textarea Field Component ───
type TextareaFieldProps = {
  label: string
  placeholder?: string
  required?: boolean
  error?: string
  value: string
  onChange: (value: string) => void
  rows?: number
}

export function MobileTextareaField({
  label,
  placeholder,
  required = false,
  error,
  value,
  onChange,
  rows = 4,
}: TextareaFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-white/80">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff6a1a]/50 focus:ring-1 focus:ring-[#ff6a1a]/25 transition-colors resize-none ${
          error ? 'border-red-400/50' : 'border-white/10'
        }`}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
