import CurrencyInput from "react-currency-input-field";
import Date from "./Date"
import Checkbox from "./Checkbox";
import { useEffect } from "react";

const ControlPanel = ({
    chosenBikes, setChosenBikes,
    startDate, endDate,
    setStartDate, setEndDate,
    minDamage, maxDamage,
    setMinDamage, setMaxDamage,
    setTheftsToShowMap,
    filterTheftsMap,
    setTheftsToShowPieChart,
    filterTheftsPieChart,
    enabled
}) => {

    useEffect(() => {
        setTheftsToShowMap(filterTheftsMap(chosenBikes, startDate, endDate, minDamage, maxDamage))
        setTheftsToShowPieChart(filterTheftsPieChart(chosenBikes, startDate, endDate, minDamage, maxDamage))
    }, [chosenBikes, startDate, endDate, minDamage, maxDamage,
        filterTheftsMap, setTheftsToShowMap, filterTheftsPieChart, setTheftsToShowPieChart]
    )

    return (
        <div style={{ paddingLeft: 24 }}>
            <h2 style={{ marginLeft: 16 }}>Datum</h2>

            <div style={{ display: "flex", flexDirection: "row" }}>
                <Date placeholder="von" value={startDate} setValue={setStartDate} disabled={!enabled} />
                <div style={{ width: 64 }} />
                <Date placeholder="bis" value={endDate} setValue={setEndDate} disabled={!enabled} />
            </div>

            <h2 style={{ marginLeft: 16 }}>Schadenshöhe</h2>

            <div style={{ display: "flex", flexDirection: "row" }}>
                <CurrencyInput
                    className="currencyInput"
                    placeholder="von"
                    defaultValue={minDamage}
                    decimalsLimit={0}
                    prefix="€"
                    disabled={!enabled}
                    onValueChange={(value, _) => {
                        setMinDamage(value)
                    }}
                />
                <div style={{ width: 64 }} />
                <CurrencyInput
                    className="currencyInput"
                    placeholder="bis"
                    defaultValue={maxDamage}
                    decimalsLimit={0}
                    prefix="€"
                    disabled={!enabled}
                    onValueChange={(value, _) => {
                        setMaxDamage(value)
                    }}
                />
            </div>

            <h2 style={{ marginLeft: 16 }}>Gewählte Gruppen</h2>
            <div style={{ display: "flex", flexDirection: "row", padding: 16, marginLeft: 32 }}>
                <Checkbox
                    label="Lastenfahrrad"
                    isChecked={chosenBikes.lastenfahrrad}
                    disabled={!enabled}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ lastenfahrrad: !chosenBikes.lastenfahrrad } })
                    }}
                />
                <div style={{ width: 64 }} />
                <Checkbox
                    label="Kinderfahrrad"
                    isChecked={chosenBikes.kinderfahrrad}
                    disabled={!enabled}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ kinderfahrrad: !chosenBikes.kinderfahrrad } })
                    }}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "row", padding: 16, marginLeft: 32 }}>
                <Checkbox
                    label="Damenfahrrad"
                    isChecked={chosenBikes.damenfahrrad}
                    disabled={!enabled}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ damenfahrrad: !chosenBikes.damenfahrrad } })
                    }}
                />
                <div style={{ width: 64 }} />
                <Checkbox
                    label="Mountainbike"
                    isChecked={chosenBikes.mountainbike}
                    disabled={!enabled}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ mountainbike: !chosenBikes.mountainbike } })
                    }}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "row", padding: 16, marginLeft: 32 }}>
                <Checkbox
                    label="Herrenfahrrad"
                    isChecked={chosenBikes.herrenfahrrad}
                    disabled={!enabled}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ herrenfahrrad: !chosenBikes.herrenfahrrad } })
                    }}
                />
                <div style={{ width: 64 }} />
                <Checkbox
                    label="Rennrad"
                    isChecked={chosenBikes.rennrad}
                    disabled={!enabled}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ rennrad: !chosenBikes.rennrad } })
                    }}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "row", padding: 16, marginLeft: 32 }}>
                <Checkbox
                    label="Fahrrad (?)"
                    isChecked={chosenBikes.fahrrad}
                    disabled={!enabled}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ fahrrad: !chosenBikes.fahrrad } })
                    }}
                />
                <div style={{ width: 64 }} />
                <Checkbox
                    label="Sonstiges"
                    isChecked={chosenBikes.sonstiges}
                    disabled={!enabled}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ sonstiges: !chosenBikes.sonstiges } })
                    }}
                />
            </div>
        </div>
    )
}

export default ControlPanel
