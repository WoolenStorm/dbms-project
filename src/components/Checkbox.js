import "../styles.css"

export default function Checkbox({ label, isChecked, setChecked }) {
    return (
        <div className="checkboxContainer" onClick={() => {
            setChecked((prev) => !prev)
            console.log(isChecked)
        }}>
            <div className="checkboxDiv">
                <span className={isChecked ? "checked" : "notChecked"} onChange={() => setChecked((prev) => !prev)}></span>
                {/* <input type="checkbox" checked={isChecked} onChange={() => setChecked((prev) => !prev)} /> */}
                <label>{label}</label>
            </div>
        </div>
    )
}