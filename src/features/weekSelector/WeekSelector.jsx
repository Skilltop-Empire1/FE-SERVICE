import React, { useState, useEffect } from 'react'
import styles from './WeekSelector.module.css'

const WeekSelector = ({ onWeekChange }) => {
  const generateWeekRanges = (numWeeks = 6) => {
    const weeks = []
    const today = new Date()

    for (let i = 0; i < numWeeks; i++) {
      const endOfWeek = new Date(today)
      endOfWeek.setDate(today.getDate() - today.getDay() - i * 7 + 6) // Sunday
      const startOfWeek = new Date(endOfWeek)
      startOfWeek.setDate(endOfWeek.getDate() - 6) // Monday

      const range = `${startOfWeek.toDateString().slice(4, 10)} - ${endOfWeek.toDateString().slice(4, 10)}`
      weeks.push(range)
    }

    return weeks.reverse() // Oldest week first
  }

  const [weeks, setWeeks] = useState(generateWeekRanges())
  const [selectedWeek, setSelectedWeek] = useState(weeks[weeks.length - 1]) // Default to latest week

  useEffect(() => {
    onWeekChange(selectedWeek) // Notify parent when week changes
  }, [selectedWeek, onWeekChange])

  return (
    <select
      value={selectedWeek}
      onChange={(e) => setSelectedWeek(e.target.value)}
      className={styles.select}
    >
      {weeks.map((week) => (
        <option key={week} value={week}>
          {week}
        </option>
      ))}
    </select>
  )
}

export default WeekSelector
