import styles from './dashboard.module.scss'
import Sidebar from '@/components/dashboard/sidebar/sidebar'

const DashboardLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <section className={styles.dashboardGrid}>
            {children}
            <Sidebar/>
        </section>
    )
}
export default DashboardLayout
