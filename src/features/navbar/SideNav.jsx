import { NavLink } from 'react-router-dom'
import {
  Users,
  Settings,
  UserPlus,
  LogOut,
  LayoutGrid,
  HeartHandshake,
  Handshake,
  ListCheck,
  Banknote,
  NotepadText,
  MessageCircleMore,
  Plus,
  X,
  ClipboardList
} from 'lucide-react'
import styles from './SideNav.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../../redux/slices/toggleMenuSlice'
import { useEffect, useRef } from 'react'

function SideNav() {
  const ref = useRef()
  const dispatch = useDispatch()
  const isOpen = useSelector((state) => state.toggleMenu.isOpen)

  const isSmallScreen = () => window.innerWidth <= 810

  const handleClickOutsideMenu = (event) => {
    if (isSmallScreen() && ref.current && !ref.current.contains(event.target)) {
      dispatch(toggleMenu())
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (!isSmallScreen() && isOpen) {
        dispatch(toggleMenu())
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutsideMenu)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu)
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen, dispatch])

  return (
    <nav
      ref={ref}
      className={`${styles.sideNav} ${isOpen ? styles.showNav : ''}`}
      aria-label="Main Side Navigation"
    >
      <div
        onClick={() => dispatch(toggleMenu())}
        role="button"
        className={styles.closeMenu}
        aria-label="Close Menu"
      >
        <X color="#ffffff" />
      </div>
      <ul className={styles.navList}>
        <div>
          <li>
            <NavLink
              to="/app/dashboard"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={() => dispatch(toggleMenu())}
            >
              <LayoutGrid className={styles.icon} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/employees"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={() => dispatch(toggleMenu())}
            >
              <Users className={styles.icon} />
              <span>Employees</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/services"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={() => dispatch(toggleMenu())}
            >
              <HeartHandshake className={styles.icon} />
              <span>Services</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/task"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={() => dispatch(toggleMenu())}
            >
              <ClipboardList className={styles.icon} />
              <span>Tasks</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/inventories"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={() => dispatch(toggleMenu())}
            >
              <ListCheck className={styles.icon} />
              <span>Inventories</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/clients"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={() => dispatch(toggleMenu())}
            >
              <Handshake className={styles.icon} />
              <span>Clients</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/finance"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={() => dispatch(toggleMenu())}
            >
              <Banknote className={styles.icon} />
              <span>Finance</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/reports"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={() => dispatch(toggleMenu())}
            >
              <NotepadText className={styles.icon} />
              <span>Reports</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/communication"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={() => dispatch(toggleMenu())}
            >
              <MessageCircleMore className={styles.icon} />
              <span>Communication</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/settings"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={() => dispatch(toggleMenu())}
            >
              <Settings className={styles.icon} />
              <span>Settings</span>
            </NavLink>
          </li>
        </div>
        <div>
          <li>
            <NavLink
              to="/app/addEmployee"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={() => dispatch(toggleMenu())}
            >
              <UserPlus className={styles.icon} />
              <span>Add Employee</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/createTask"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={() => dispatch(toggleMenu())}
            >
              <Plus className={styles.icon} />
              <span>Create Task</span>
            </NavLink>
          </li>
          <li>
            <div role="button" className={styles.logout}>
              <LogOut className={styles.logoutIcon} />
              <span>Logout</span>
            </div>
          </li>
        </div>
      </ul>
    </nav>
  )
}

export default SideNav
