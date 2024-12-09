import { Bell, MessageCircle, Settings, UserRound } from 'lucide-react'

import styles from './Topbar.module.css'

function TopBar() {
  return (
    <div className={styles.navContainer}>
      <div>
        <img src="" alt="" />
      </div>
      <ul>
        <li>
          <Bell />
        </li>
        <li>
          <MessageCircle />
        </li>
        <li>
          <Settings />
        </li>
        <li>
          <UserRound />
        </li>
      </ul>
    </div>
  )
}

export default TopBar
