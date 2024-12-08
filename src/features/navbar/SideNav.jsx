import { NavLink } from 'react-router-dom'
import {
  Home,
  Users,
  Briefcase,
  UserCheck,
  Package,
  DollarSign,
  BarChart2,
  MessageCircle,
  Settings,
  UserPlus,
  ClipboardList,
  LogOut,
  LayoutGrid,
  HeartHandshake,
  Handshake,
  ListCheck,
  Banknote,
  NotepadText,
  MessageCircleMore,
  Plus,
} from 'lucide-react'
import styles from './SideNav.module.css'

function SideNav() {
  return (
    <div className={styles.sideNav}>
      <nav>
        <ul className={styles.navList}>
          <div>
            <li>
              <NavLink
                to="/app/dashboard"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
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
              >
                <HeartHandshake className={styles.icon} />
                <span>Services</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/app/clients"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                <Handshake className={styles.icon} />
                <span>Clients</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/app/inventories"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                <ListCheck className={styles.icon} />
                <span>Inventories</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/app/finance"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
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
              >
                <Plus className={styles.icon} />
                <span>Create Task</span>
              </NavLink>
            </li>
          </div>
        </ul>
        <div className={styles.logout}>
          <LogOut className={styles.logoutIcon} />
          <span>Logout</span>
        </div>
      </nav>
    </div>
  )
}

export default SideNav
