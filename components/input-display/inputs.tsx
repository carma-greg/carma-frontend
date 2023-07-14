import styles from './inputs.module.scss'

export default function Inputs() {
    return (
        <div className="section">
            <div className="content">
                <form className={styles.horizontalForm}>
                    <div className={styles.formGroup}><label htmlFor="newInput">New Input</label><input name="newInput" type="text" /></div>
                </form>
            </div>
        </div>
    )
}