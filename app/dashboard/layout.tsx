import styles from './dashboard.module.scss'
import Sidebar from '@/components/dashboard/sidebar/sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className={styles.dashboardGrid}>
            {children}
            <Sidebar/>
        </section>
    )
}
