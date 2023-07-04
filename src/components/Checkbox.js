import "../styles.css"

const Checkbox = ({ label, isChecked, setChecked, disabled }) => {
    return (
        <div className={disabled ? "disabled" : "checkboxContainer"} onClick={disabled ? () => { } : () => setChecked()}>
            <div className="checkboxDiv">
                <span className={isChecked ? "checked" : "notChecked"}></span>
                <label>{label}</label>
            </div>
        </div>
    )
}

export default Checkbox
