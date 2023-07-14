import Link from "next/link";

import styles from './button.module.scss'

interface LinkButton {
    "linkHref": string,
    "linkText": string,
    "linkStyle": string
}

export function LinkButton({linkHref, linkText, linkStyle}: LinkButton) {
    return(
        <Link className={`${styles.button} ${styles[linkStyle]}`} href={linkHref}>{linkText}</Link>
    )
}