import { Clock11, Dot } from 'lucide-react'
import React from 'react'
import styles from './TaskCard.module.css'

const statusColors = {
  Completed: '#32DE07', // Green completed
  'In Progress': '#0B74EE', // Yellow in progress use blue
  'To do': '#FF8C05', // Red
}

function TaskCard({ header, taskName, timeStamp, taskStatus }) {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  return (
    <article className={styles.card}>
      <aside
        className={styles.icon}
        style={{ color: statusColors[taskStatus] }}
      >
        <Dot />
      </aside>
      <main className={styles.main}>
        <header className={styles.header}>{header}</header>
        <section className={styles.taskName}>
          <p title={taskName}>{truncateText(taskName, 16)}</p>{' '}
          <span style={{ color: statusColors[taskStatus], fontWeight: 'bold' }}>
            {taskStatus}
          </span>
        </section>
        <footer className={styles.footer}>
          <Clock11 size={16} />
          <span className={styles.timestamp}>{timeStamp} ago</span>
        </footer>
      </main>
    </article>
  )
}

export default TaskCard
