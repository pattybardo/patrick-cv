interface TagProps {
  label: string
  variant?: 'default' | 'accent' | 'status'
}

const statusColors: Record<string, string> = {
  'open-source': 'border-accent text-accent',
  'shipped': 'border-[#00cfff] text-[#00cfff]',
  'archived': 'border-text-muted text-text-muted',
}

export function Tag({ label, variant = 'default' }: TagProps) {
  if (variant === 'status') {
    return (
      <span className={`font-mono text-[10px] uppercase tracking-widest border px-1.5 py-0.5 ${statusColors[label] ?? 'border-border text-text-muted'}`}>
        {label}
      </span>
    )
  }
  return (
    <span className={`font-mono text-[10px] uppercase tracking-widest border border-border px-1.5 py-0.5 text-text-muted ${variant === 'accent' ? 'border-accent text-accent' : ''}`}>
      {label}
    </span>
  )
}
