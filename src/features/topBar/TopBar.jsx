import { Bell, Menu, MessageCircle, Settings, UserRound } from 'lucide-react'

import styles from './Topbar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../../redux/slices/toggleMenuSlice'
import { Link } from 'react-router'

function TopBar() {
  const dispatch = useDispatch()
  const isOpen = useSelector((state) => state.toggleMenu.isOpen)

  function handleToggleMenu(event) {
    event.stopPropagation()
    dispatch(toggleMenu())
    console.log('toggleMenu sate is:', isOpen)
  }

  return (
    <header className={styles.navContainer}>
      <div className={styles.imageContainer}>
        <Link to="/app/dashboard">
          <img
            className={styles.logo}
            src="/service-logo.svg"
            alt="service app"
          />
        </Link>

        <Menu
          size={32}
          onClick={handleToggleMenu}
          className={styles.hamburger}
        />
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
    </header>
  )
}

export default TopBar
