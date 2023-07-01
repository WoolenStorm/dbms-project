import "../styles.css"

const Checkbox = ({ label, isChecked, setChecked }) => {
    return (
        <div className="checkboxContainer" onClick={() => setChecked()}>
            <div className="checkboxDiv">
                <span className={isChecked ? "checked" : "notChecked"}></span>
                <label>{label}</label>
            </div>
        </div>
    )
}

export default Checkbox
