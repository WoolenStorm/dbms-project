const ToggleSwitch = ({ isChecked, onToggle }) => {
    return (
        <label className="toggle-switch">
            <input type="checkbox" checked={isChecked} onChange={onToggle} />
            <span className="switch" />
        </label>
    )
}

export default ToggleSwitch