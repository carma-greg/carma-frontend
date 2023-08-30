"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/app/state'

import styles from './header.module.scss'

import logo from '@/public/images/carma-logo.svg'
import { LinkButton } from '../buttons/button'

export function UserCluster() {
    const { user, login, logout, user_id } = useAuth();
    return(
        <>
        {!user?(<>
            <LinkButton linkHref='/login' linkText='Login' linkStyle='secondary' />
        <LinkButton linkHref='/blog' linkText='Sign Up' linkStyle='primary' />
        </>):(<>
            <LinkButton linkHref='/login' linkText='Log Out' linkStyle='secondary' />
            </>
            )
        }
        </>
    )
}

export default function Header(){
    return (
        <div className={styles.headerOuter} id="header">
                <div className={`content ${styles.headerInner}`}>
                <div className={styles.headerLeft}>
                    <Link href="/" className={styles.headerLogo}>
                        <Image src={logo} alt="Carma.Earth"/>
                    </Link>
                    <ul className={`clean ${styles.navigation}`}>
                        <li className={styles.nav}><Link href="/shop" className={styles.navLink}>Shop</Link></li>
                        <li className={styles.nav}><Link href="/dashboard/impact" className={styles.navLink}>Dashboard</Link></li>
                        <li className={styles.nav}><Link href="/" className={styles.navLink}>Cashback</Link></li>
                        <li className={styles.nav}><Link href="/" className={styles.navLink}>About</Link></li>
                        <li className={styles.nav}><Link href="/blog" className={styles.navLink}>Blog</Link></li>
                        <li className={styles.nav}><Link href="/" className={styles.navLink}>Contact</Link></li>
                    </ul>
                </div>
                <div className={styles.headerRight}>
                   <UserCluster/>
                </div>
            </div>
        </div>
    )
}