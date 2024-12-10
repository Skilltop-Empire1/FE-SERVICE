import TopBar from '../../features/topBar/TopBar'
import SideNav from '../../features/navbar/SideNav'
import { Outlet } from 'react-router'

import styles from './AppLayout.module.css'

function AppLayout() {
  return (
    <div>
      <TopBar />
      <div className={styles.main}>
        <SideNav />
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AppLayout
