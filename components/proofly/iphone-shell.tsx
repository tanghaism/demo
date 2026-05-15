"use client"

import React from "react"

interface IPhoneShellProps {
  children: React.ReactNode
  className?: string
}

export function IPhoneShell({ children, className = "" }: IPhoneShellProps) {
  return (
    <div
      className={`relative mx-auto overflow-hidden ${className}`}
      style={{
        width: 390,
        height: 844,
        borderRadius: 48,
        background: "var(--iphone-shell-bg)",
        boxShadow: "var(--iphone-shell-shadow)",
      }}
    >
      {/* Status Bar */}
      <div
        className="absolute top-0 left-0 right-0 z-50 flex items-end justify-between px-8"
        style={{ height: 54, paddingBottom: 6 }}
      >
        <span className="font-semibold" style={{ fontSize: 15, letterSpacing: -0.3, color: "var(--iphone-status)" }}>9:41</span>
        <div className="flex items-center gap-1.5">
          {/* Signal */}
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <rect x="0" y="6" width="3" height="6" rx="1" fill="var(--iphone-status)"/>
            <rect x="4.5" y="4" width="3" height="8" rx="1" fill="var(--iphone-status)"/>
            <rect x="9" y="2" width="3" height="10" rx="1" fill="var(--iphone-status)"/>
            <rect x="13.5" y="0" width="3" height="12" rx="1" fill="var(--iphone-status)"/>
          </svg>
          {/* Wifi */}
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M8 9.5L8.01 9.51" stroke="var(--iphone-status)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M5.5 7C6.16 6.34 7.05 5.96 8 5.96C8.95 5.96 9.84 6.34 10.5 7" stroke="var(--iphone-status)" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M3 4.5C4.34 3.16 6.1 2.37 8 2.37C9.9 2.37 11.66 3.16 13 4.5" stroke="var(--iphone-status)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {/* Battery */}
          <div className="flex items-center">
            <div className="relative rounded-sm" style={{ width: 24, height: 12, border: "1px solid var(--iphone-status)" }}>
              <div className="absolute inset-0.5 rounded-sm" style={{ width: '70%', background: "var(--iphone-status)" }}/>
            </div>
            <div className="ml-0.5 rounded-sm" style={{ width: 2, height: 5, background: "var(--iphone-status)" }}/>
          </div>
        </div>
      </div>

      {/* Dynamic Island */}
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 bg-black z-50"
        style={{ width: 120, height: 34, borderRadius: 20 }}
      />

      {/* Content */}
      <div className="absolute inset-0 overflow-hidden" style={{ top: 0 }}>
        {children}
      </div>
    </div>
  )
}
