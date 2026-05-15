"use client"

export function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 premium-screen" />
      <div
        className="absolute -top-16 -left-14 rounded-full blur-3xl"
        style={{ width: 180, height: 180, background: "var(--premium-glow-blue)" }}
      />
      <div
        className="absolute top-24 -right-20 rounded-full blur-3xl"
        style={{ width: 190, height: 190, background: "var(--premium-glow-indigo)" }}
      />
      <div
        className="absolute -bottom-24 left-20 rounded-full blur-3xl"
        style={{ width: 220, height: 220, background: "var(--premium-glow-mint)" }}
      />
    </div>
  )
}
