// Date Range Filter Component - Advanced date picker with presets
"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { DSButton } from "./ds-button"
import { DSInput } from "./ds-input"
import { DSCard } from "./ds-card"
import { cn } from "@/lib/utils"

interface DateRange {
  from: Date
  to: Date
}

interface DateRangeFilterProps {
  onApply?: (range: DateRange) => void
  onCancel?: () => void
  initialRange?: DateRange
}

const getPresetRange = (preset: string): DateRange => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const from = new Date(today)
  const to = new Date(today)

  switch (preset) {
    case "yesterday":
      from.setDate(from.getDate() - 1)
      to.setDate(to.getDate() - 1)
      break
    case "previous-week":
      from.setDate(from.getDate() - from.getDay() - 7)
      to.setDate(to.getDate() - to.getDay() - 1)
      break
    case "previous-month":
      from.setMonth(from.getMonth() - 1)
      from.setDate(1)
      to.setDate(0)
      break
    case "previous-quarter":
      const quarter = Math.floor(from.getMonth() / 3)
      from.setMonth(quarter * 3 - 3)
      from.setDate(1)
      to.setMonth(quarter * 3)
      to.setDate(0)
      break
    case "previous-year":
      from.setFullYear(from.getFullYear() - 1)
      from.setMonth(0)
      from.setDate(1)
      to.setFullYear(to.getFullYear() - 1)
      to.setMonth(11)
      to.setDate(31)
      break
    case "previous-year-match":
      from.setFullYear(from.getFullYear() - 1)
      to.setFullYear(to.getFullYear() - 1)
      break
    case "black-friday":
      from.setMonth(10)
      from.setDate(24)
      to.setMonth(10)
      to.setDate(27)
      break
  }

  return { from, to }
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

const getFirstDayOfMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

const Calendar = ({
  month,
  year,
  selectedFrom,
  selectedTo,
  onDateSelect,
}: {
  month: number
  year: number
  selectedFrom: Date | null
  selectedTo: Date | null
  onDateSelect: (date: Date) => void
}) => {
  const daysInMonth = getDaysInMonth(new Date(year, month))
  const firstDay = getFirstDayOfMonth(new Date(year, month))
  const days = []

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i))
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  return (
    <div className="w-full">
      <h3 className="mb-4 text-center font-semibold">
        {monthNames[month]} {year}
      </h3>
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        {days.map((day, idx) => {
          const isSelected =
            day &&
            selectedFrom &&
            selectedTo &&
            day >= selectedFrom &&
            day <= selectedTo &&
            day.getDate() !== selectedFrom.getDate()
          const isStart = day && selectedFrom && day.toDateString() === selectedFrom.toDateString()
          const isEnd = day && selectedTo && day.toDateString() === selectedTo.toDateString()

          return (
            <button
              key={idx}
              onClick={() => day && onDateSelect(day)}
              className={cn(
                "aspect-square rounded text-sm transition-colors",
                !day && "cursor-default",
                day && !isSelected && !isStart && !isEnd && "hover:bg-muted",
                isSelected && "bg-primary/20",
                isStart && "bg-primary text-primary-foreground font-semibold",
                isEnd && "bg-primary text-primary-foreground font-semibold",
              )}
              disabled={!day}
            >
              {day?.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onApply, onCancel, initialRange }) => {
  const [selectedFrom, setSelectedFrom] = useState<Date | null>(initialRange?.from || null)
  const [selectedTo, setSelectedTo] = useState<Date | null>(initialRange?.to || null)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleDateSelect = (date: Date) => {
    if (!selectedFrom || (selectedFrom && selectedTo)) {
      setSelectedFrom(date)
      setSelectedTo(null)
    } else if (date < selectedFrom) {
      setSelectedFrom(date)
    } else {
      setSelectedTo(date)
    }
  }

  const handlePresetClick = (preset: string) => {
    const range = getPresetRange(preset)
    setSelectedFrom(range.from)
    setSelectedTo(range.to)
  }

  const handleApply = () => {
    if (selectedFrom && selectedTo) {
      onApply?.({ from: selectedFrom, to: selectedTo })
      setIsOpen(false)
    }
  }

  const handleCancel = () => {
    setIsOpen(false)
    onCancel?.()
  }

  const presets = [
    { label: "No comparison", value: "no-comparison" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Previous week", value: "previous-week" },
    { label: "Previous month", value: "previous-month" },
    { label: "Previous quarter", value: "previous-quarter" },
    { label: "Previous year", value: "previous-year" },
    { label: "Previous year (match day of week)", value: "previous-year-match" },
    { label: "Black Friday Cyber Monday", value: "black-friday" },
  ]

  return (
    <div className="relative inline-block w-full">
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 hover:bg-muted"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-sm">
          {selectedFrom && selectedTo ? `${formatDate(selectedFrom)} - ${formatDate(selectedTo)}` : "Select date range"}
        </span>
      </div>

      {isOpen && (
        <DSCard ref={contentRef} className="absolute right-0 top-full z-50 mt-2 w-full max-w-4xl" padding="lg">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {/* Presets */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Presets</h4>
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => handlePresetClick(preset.value)}
                  className="block w-full text-left rounded px-2 py-1 text-sm hover:bg-muted"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Date Inputs */}
            <div className="space-y-4 md:col-span-3">
              <div className="flex gap-2">
                <DSInput
                  type="text"
                  value={selectedFrom ? formatDate(selectedFrom) : ""}
                  readOnly
                  placeholder="From date"
                  size="sm"
                />
                <span className="flex items-center">→</span>
                <DSInput
                  type="text"
                  value={selectedTo ? formatDate(selectedTo) : ""}
                  readOnly
                  placeholder="To date"
                  size="sm"
                />
                <button className="rounded-md border border-input p-2 hover:bg-muted">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Calendars */}
              <div className="grid grid-cols-2 gap-4">
                <Calendar
                  month={currentMonth}
                  year={currentYear}
                  selectedFrom={selectedFrom}
                  selectedTo={selectedTo}
                  onDateSelect={handleDateSelect}
                />
                <Calendar
                  month={currentMonth === 11 ? 0 : currentMonth + 1}
                  year={currentMonth === 11 ? currentYear + 1 : currentYear}
                  selectedFrom={selectedFrom}
                  selectedTo={selectedTo}
                  onDateSelect={handleDateSelect}
                />
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <DSButton
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1)
                    if (currentMonth === 0) setCurrentYear(currentYear - 1)
                  }}
                >
                  ← Previous
                </DSButton>
                <DSButton
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1)
                    if (currentMonth === 11) setCurrentYear(currentYear + 1)
                  }}
                >
                  Next →
                </DSButton>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 border-t pt-4">
                <DSButton variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </DSButton>
                <DSButton size="sm" onClick={handleApply} disabled={!selectedFrom || !selectedTo}>
                  Apply
                </DSButton>
              </div>
            </div>
          </div>
        </DSCard>
      )}
    </div>
  )
}
