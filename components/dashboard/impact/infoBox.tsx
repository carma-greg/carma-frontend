import styles from './infoBox.module.scss'

type infoBoxProps = {
    display: string;
    uk_trees?: number;
    offshore_trees?: number;
    uk_co2?: number;
    offshore_co2?: number;
}
export default function InfoBox({display, uk_trees, offshore_trees, uk_co2, offshore_co2}: infoBoxProps) {
    switch(display){
        case "uk":
        return (
            <div className={styles.infoBox}>
                <p>UK Trees:</p>
                <p>{uk_trees}</p>
            </div>
        )
        case "offshore":
        return (
            <div className={styles.infoBox}>
                <p>Offshore Trees:</p>
                <p>{offshore_trees}</p>
            </div>
        )
    }
}