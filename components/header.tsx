import Image from 'next/image'
import Link from 'next/link'

import styles from './header.module.scss'

import logo from '../public/images/carma-logo.svg'

export default function Header(){
    return (
        <div className={styles.headerOuter} id="header">
            <div className={styles.headerInner}>
                <div className={styles.headerLeft}>
                    <a href="" className={styles.headerLogo}>
                        <Image src={logo} alt="Carma.Earth"/>
                    </a>
                </div>
                <div className={styles.headerRight}></div>
            </div>
        </div>
    )
}