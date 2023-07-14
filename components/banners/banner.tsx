import styles from './banner.module.scss'
import { LinkButton } from '@/components/buttons/button'
import Link from 'next/link'
import Image from 'next/image'

import people from '../../public/images/banner/people_ring.png'
import globe from '../../public/images/banner/globe.png'

export default function Banner() {
    return(
        <div className="section">
            <div className={`${styles.split} content`}>
                <div className={styles.leftSide}>
                    <h1>Plant trees.</h1>
                    <h1 className="textHighlight">Get rewards.</h1>
                    <h1>Feel brilliant.</h1>
                    <div className={styles.actionGroup}>
                        <LinkButton linkHref='blog' linkStyle='primary' linkText='Trees & Cashback'/>
                        <LinkButton linkHref='blog' linkStyle='new' linkText='Fancy button!'/>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.imgGroup}>

                    <Image className={styles.globe} src={globe} style={{objectFit: "contain"}} alt="Globe" />
                    <Image className={styles.people} src={people} style={{objectFit: "contain"}} alt="People" />
                    </div>
                </div>
            </div>
        </div>
    )
}