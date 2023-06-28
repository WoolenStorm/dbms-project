import CurrencyInput from "react-currency-input-field";
import Date from "./Date"
import Checkbox from "./Checkbox";
import { useState } from "react";

const ControlPanel = () => {

    const [isChecked, setChecked] = useState({
        lastenfahrrad: false,
        sonstiges: false,
        fahrrad: false,
        herrenfahrrad: false,
        kinderfahrrad: false,
        mountainbike: false,
        rennrad: false,
        damenfahrrad: false
    })

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

            <h2 style={{ marginLeft: 16 }}>Gewählte Gruppen</h2>
            <div style={{ display: "flex", flexDirection: "row", padding: 16, marginLeft: 32 }}>
                <Checkbox
                    label="Lastenfahrrad"
                    isChecked={isChecked.lastenfahrrad}
                    setChecked={() => {
                        setChecked({ ...isChecked, ...{ lastenfahrrad: !isChecked.lastenfahrrad } })
                    }}
                />
                <div style={{ width: 64 }} />
                <Checkbox
                    label="Kinderfahrrad"
                    isChecked={isChecked.kinderfahrrad}
                    setChecked={() => {
                        setChecked({ ...isChecked, ...{ kinderfahrrad: !isChecked.kinderfahrrad } })
                    }}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "row", padding: 16, marginLeft: 32 }}>
                <Checkbox
                    label="Damenfahrrad"
                    isChecked={isChecked.damenfahrrad}
                    setChecked={() => {
                        setChecked({ ...isChecked, ...{ damenfahrrad: !isChecked.damenfahrrad } })
                    }}
                />
                <div style={{ width: 64 }} />
                <Checkbox
                    label="Mountainbike"
                    isChecked={isChecked.mountainbike}
                    setChecked={() => {
                        setChecked({ ...isChecked, ...{ mountainbike: !isChecked.mountainbike } })
                    }}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "row", padding: 16, marginLeft: 32 }}>
                <Checkbox
                    label="Herrenfahrrad"
                    isChecked={isChecked.herrenfahrrad}
                    setChecked={() => {
                        setChecked({ ...isChecked, ...{ herrenfahrrad: !isChecked.herrenfahrrad } })
                    }}
                />
                <div style={{ width: 64 }} />
                <Checkbox
                    label="Rennrad"
                    isChecked={isChecked.rennrad}
                    setChecked={() => {
                        setChecked({ ...isChecked, ...{ rennrad: !isChecked.rennrad } })
                    }}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "row", padding: 16, marginLeft: 32 }}>
                <Checkbox
                    label="Fahrrad (?)"
                    isChecked={isChecked.fahrrad}
                    setChecked={() => {
                        setChecked({ ...isChecked, ...{ fahrrad: !isChecked.fahrrad } })
                    }}
                />
                <div style={{ width: 64 }} />
                <Checkbox
                    label="Sonstiges"
                    isChecked={isChecked.sonstiges}
                    setChecked={() => {
                        setChecked({ ...isChecked, ...{ sonstiges: !isChecked.sonstiges } })
                    }}
                />
            </div>
        </div>
    )
}

export default ControlPanel
