import MetricCard from '../../components/selectOptions/businessMetricCard/MetricCard'
import SearchAndButtons from '../../features/searchAndButtons/SearchAndButtons'
import { BriefcaseBusiness, Plus, Users } from 'lucide-react'
import styles from './Dashboard.module.css'
import MultiBarChart from '../../components/barChart/MultiBarChart'
import WeekSelector from '../../features/weekSelector/WeekSelector'
import { Link } from 'react-router'
import TaskCard from '../../components/taskCard/TaskCard'

const tasks = [
  {
    id: 1,
    header: 'Project Kickoff',
    taskName: 'Team meeting to discuss project scope',
    timeStamp: '2h',
    taskStatus: 'Completed',
  },
  {
    id: 2,
    header: 'Design Review',
    taskName: 'Review UI/UX wireframes',
    timeStamp: '30m',
    taskStatus: 'To do',
  },
  {
    id: 3,
    header: 'Development',
    taskName: 'Implement authentication flow',
    timeStamp: '4h',
    taskStatus: 'In Progress',
  },
]

function Dashboard() {
  return (
    <div>
      <SearchAndButtons
        SingleButtonIcon={Plus}
        buttonName="Create Task"
        pageName="Dashboard"
      />
      <section className={styles.businessMetric}>
        <header>Business Metrics</header>
        <main className={styles.cardsContainer}>
          <MetricCard
            topIcon={<Users color="#4694EF" size={20} />}
            percentChange={12}
            commentary="From last Month"
            quantity={156}
            cardName="Total Client"
          />
          <MetricCard
            topIcon={<BriefcaseBusiness color="#4694EF" size={20} />}
            percentChange={12}
            commentary="From last Month"
            quantity={156}
            cardName="Total Client"
          />
          <MetricCard
            topIcon={<Users color="#4694EF" size={20} />}
            percentChange={12}
            commentary="From last Month"
            quantity={156}
            cardName="Total Client"
          />
          <MetricCard
            topIcon={<Users color="#4694EF" size={20} />}
            percentChange={12}
            commentary="From last Month"
            quantity={156}
            cardName="Total Client"
          />
        </main>
      </section>
      <section className={styles.performance}>
        <div className={styles.performanceHeader}>
          <h3>Task Performance</h3>
          <WeekSelector onWeekChange={() => console.log('week changed')} />
        </div>
        <MultiBarChart />
      </section>
      <section className={styles.recentTask}>
        <div className={styles.taskHeader}>
          <h3>Recent Task</h3>
          <Link>View All Tasks</Link>
        </div>
        <div className={styles.taskCards}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              header={task.header}
              taskName={task.taskName}
              timeStamp={task.timeStamp}
              taskStatus={task.taskStatus}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
