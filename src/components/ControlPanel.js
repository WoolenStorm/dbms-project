import CurrencyInput from "react-currency-input-field";
import Date from "./Date"
import Checkbox from "./Checkbox";


const ControlPanel = ({
    chosenBikes, setChosenBikes,
    startDate, endDate,
    setStartDate, setEndDate,
    minDamage, maxDamage,
    setMinDamage, setMaxDamage
}) => {

    return (
        <div style={{ paddingLeft: 24 }}>
            <h2 style={{ marginLeft: 16 }}>Datum</h2>

            <div style={{ display: "flex", flexDirection: "row" }}>
                <Date placeholder="von" value={startDate} setValue={setStartDate} />
                <div style={{ width: 64 }} />
                <Date placeholder="bis" value={endDate} setValue={setEndDate} />
            </div>

            <h2 style={{ marginLeft: 16 }}>Schadenshöhe</h2>

            <div style={{ display: "flex", flexDirection: "row" }}>
                <CurrencyInput
                    className="currencyInput"
                    placeholder="von"
                    defaultValue={minDamage}
                    decimalsLimit={0}
                    prefix="€"
                    onValueChange={(value, _) => setMinDamage(value)}
                />
                <div style={{ width: 64 }} />
                <CurrencyInput
                    className="currencyInput"
                    placeholder="bis"
                    defaultValue={maxDamage}
                    decimalsLimit={0}
                    prefix="€"
                    onValueChange={(value, _) => setMaxDamage(value)}
                />
            </div>

            <h2 style={{ marginLeft: 16 }}>Gewählte Gruppen</h2>
            <div style={{ display: "flex", flexDirection: "row", padding: 16, marginLeft: 32 }}>
                <Checkbox
                    label="Lastenfahrrad"
                    isChecked={chosenBikes.lastenfahrrad}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ lastenfahrrad: !chosenBikes.lastenfahrrad } })
                    }}
                />
                <div style={{ width: 64 }} />
                <Checkbox
                    label="Kinderfahrrad"
                    isChecked={chosenBikes.kinderfahrrad}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ kinderfahrrad: !chosenBikes.kinderfahrrad } })
                    }}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "row", padding: 16, marginLeft: 32 }}>
                <Checkbox
                    label="Damenfahrrad"
                    isChecked={chosenBikes.damenfahrrad}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ damenfahrrad: !chosenBikes.damenfahrrad } })
                    }}
                />
                <div style={{ width: 64 }} />
                <Checkbox
                    label="Mountainbike"
                    isChecked={chosenBikes.mountainbike}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ mountainbike: !chosenBikes.mountainbike } })
                    }}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "row", padding: 16, marginLeft: 32 }}>
                <Checkbox
                    label="Herrenfahrrad"
                    isChecked={chosenBikes.herrenfahrrad}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ herrenfahrrad: !chosenBikes.herrenfahrrad } })
                    }}
                />
                <div style={{ width: 64 }} />
                <Checkbox
                    label="Rennrad"
                    isChecked={chosenBikes.rennrad}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ rennrad: !chosenBikes.rennrad } })
                    }}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "row", padding: 16, marginLeft: 32 }}>
                <Checkbox
                    label="Fahrrad (?)"
                    isChecked={chosenBikes.fahrrad}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ fahrrad: !chosenBikes.fahrrad } })
                    }}
                />
                <div style={{ width: 64 }} />
                <Checkbox
                    label="Sonstiges"
                    isChecked={chosenBikes.sonstiges}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ sonstiges: !chosenBikes.sonstiges } })
                    }}
                />
            </div>
        </div>
    )
}

export default ControlPanel
