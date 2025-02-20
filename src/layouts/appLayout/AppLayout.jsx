import TopBar from '../../features/topBar/TopBar'
import SideNav from '../../features/navbar/SideNav'
import { Outlet } from 'react-router'

import styles from './AppLayout.module.css'
import ModalManager from '@src/modals/expenseModal/ModalManager'

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
      <ModalManager />
    </div>
  )
}

export default AppLayout
