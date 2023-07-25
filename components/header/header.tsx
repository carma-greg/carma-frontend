import Image from 'next/image'
import Link from 'next/link'

import styles from './header.module.scss'

import logo from '@/public/images/carma-logo.svg'
import { LinkButton } from '../buttons/button'

export default function Header(){
    return (
        <div className={styles.headerOuter} id="header">
                <div className={`content ${styles.headerInner}`}>
                <div className={styles.headerLeft}>
                    <Link href="/" className={styles.headerLogo}>
                        <Image src={logo} alt="Carma.Earth"/>
                    </Link>
                    <ul className={`clean ${styles.navigation}`}>
                        <li className={styles.nav}><Link href="/" className={styles.navLink}>Subscribe</Link></li>
                        <li className={styles.nav}><Link href="/" className={styles.navLink}>Business</Link></li>
                        <li className={styles.nav}><Link href="/" className={styles.navLink}>Cashback</Link></li>
                        <li className={styles.nav}><Link href="/" className={styles.navLink}>About</Link></li>
                        <li className={styles.nav}><Link href="/blog" className={styles.navLink}>Blog</Link></li>
                        <li className={styles.nav}><Link href="/" className={styles.navLink}>Contact</Link></li>
                    </ul>
                </div>
                <div className={styles.headerRight}>
                    <LinkButton linkHref='blog' linkText='Login' linkStyle='secondary' />
                    <LinkButton linkHref='blog' linkText='Sign Up' linkStyle='primary' />
                </div>
            </div>
        </div>
    )
}