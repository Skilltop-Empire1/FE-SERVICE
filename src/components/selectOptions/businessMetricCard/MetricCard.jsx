import { MoreHorizontal } from 'lucide-react'
import React from 'react'
import styles from './MetricCard.module.css'

function MetricCard({
  topIcon,
  cardName,
  quantity,
  percentChange,
  commentary,
}) {
  return (
    <article className={styles.metricCard}>
      <header className={styles.metricHeader}>
        <span aria-hidden="true">{topIcon}</span>
        <button className={styles.moreOptionsBtn} aria-label="More options">
          <MoreHorizontal size={14} />
        </button>
      </header>

      <h3 className={styles.metricTitle}>{cardName}</h3>

      <div className={styles.metricData}>
        <span className={styles.metricQuantity}>{quantity}</span>

        {percentChange !== 0 && (
          <span
            className={percentChange > 0 ? styles.positive : styles.negative}
          >
            {percentChange > 0 ? `+${percentChange}` : percentChange}%
          </span>
        )}

        <p className={styles.metricCommentary}>{commentary}</p>
      </div>
    </article>
  )
}

export default MetricCard
