import CurrencyInput from "react-currency-input-field";
import Date from "./Date"
import Checkbox from "./Checkbox";

export default function ControlPanel() {
    return (
        <div style={{ paddingLeft: 24 }}>
            <h2 style={{ marginLeft: 16 }}>Datum</h2>

            <div style={{ display: "flex", flexDirection: "row" }}>
                <Date placeholder="von" />
                <div style={{ width: 64 }} />
                <Date placeholder="bis" />
            </div>

            <h2 style={{ marginLeft: 16 }}>Schadenshöhe</h2>

            <div style={{ display: "flex", flexDirection: "row" }}>
                <CurrencyInput
                    className="currencyInput"
                    placeholder="von"
                    defaultValue={0}
                    decimalsLimit={0}
                    prefix="€"
                    onValueChange={(value, name) => console.log(value, name)}
                />
                <div style={{ width: 64 }} />
                <CurrencyInput
                    className="currencyInput"
                    placeholder="bis"
                    defaultValue={10000}
                    decimalsLimit={0}
                    prefix="€"
                    onValueChange={(value, name) => console.log(value, name)}
                />
            </div>


        </div>
    )
}