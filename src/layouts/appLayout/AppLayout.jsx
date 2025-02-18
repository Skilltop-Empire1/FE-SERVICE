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
        <main className={styles.outlet}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
