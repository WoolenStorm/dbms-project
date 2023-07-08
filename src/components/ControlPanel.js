import CurrencyInput from "react-currency-input-field";
import DateComponent from "./DateComponent"
import Checkbox from "./Checkbox";
import { useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import dayjs from "dayjs";

const ControlPanel = ({
    chosenBikes, setChosenBikes,
    startDate, endDate,
    setStartDate, setEndDate,
    minDamage, maxDamage,
    setMinDamage, setMaxDamage,
    setTheftsToShow,
    filterThefts,
    enabled,
}) => {

    const [isDateEnabled, setIsDateEnabled] = useState(true)
    const [isDamageEnabled, setIsDamageEnabled] = useState(true)
    const [isTypeEnabled, setIsTypeEnabled] = useState(true)

    useEffect(
        () => setTheftsToShow(
            filterThefts(
                // chosenBikes,
                isTypeEnabled ? chosenBikes : {
                    lastenfahrrad: true,
                    sonstiges: true,
                    fahrrad: true,
                    herrenfahrrad: true,
                    kinderfahrrad: true,
                    mountainbike: true,
                    rennrad: true,
                    damenfahrrad: true
                },
                isDateEnabled ? startDate : dayjs("2020-01-01"),
                isDateEnabled ? endDate : (new Date()).toString(),
                isDamageEnabled ? minDamage : 0,
                isDamageEnabled ? maxDamage : 10000)),
        [chosenBikes, startDate, endDate, minDamage, maxDamage, filterThefts, setTheftsToShow,
            isDateEnabled, isDamageEnabled, isTypeEnabled]
    )

    return (
        <div style={{ paddingLeft: "1vw" }}>

            <div style={{ display: "flex", flexDirection: "row", position: "relative" }}>

                <div className="switchContainer">
                    <ToggleSwitch isChecked={isDateEnabled} onToggle={() => setIsDateEnabled(!isDateEnabled)} />
                </div>

                <h2 style={{ marginLeft: "3vw" }}>Datum</h2>
            </div>


            <div style={{ display: "flex", flexDirection: "row" }}>
                <DateComponent placeholder="von" value={startDate} setValue={setStartDate} disabled={!enabled || !isDateEnabled} />
                <div style={{ width: "3vw" }} />
                <DateComponent placeholder="bis" value={endDate} setValue={setEndDate} disabled={!enabled || !isDateEnabled} />
            </div>

            <div style={{ display: "flex", flexDirection: "row", position: "relative" }}>

                <div className="switchContainer">
                    <ToggleSwitch isChecked={isDamageEnabled} onToggle={() => setIsDamageEnabled(!isDamageEnabled)} />
                </div>


                <h2 style={{ marginLeft: "3vw" }}>Schadenshöhe</h2>
            </div>



            <div style={{ display: "flex", flexDirection: "row" }}>
                <CurrencyInput
                    className={enabled && isDamageEnabled ? "currencyInput" : "currencyInputDisabled"}
                    placeholder="von"
                    defaultValue={minDamage}
                    decimalsLimit={0}
                    prefix=" €"
                    disabled={!enabled || !isDamageEnabled}
                    onValueChange={(value, _) => {
                        setMinDamage(value)
                    }}
                />
                <div style={{ width: "3vw" }} />
                <CurrencyInput
                    className={enabled && isDamageEnabled ? "currencyInput" : "currencyInputDisabled"}
                    placeholder="bis"
                    defaultValue={maxDamage}
                    decimalsLimit={0}
                    prefix=" €"
                    disabled={!enabled || !isDamageEnabled}
                    onValueChange={(value, _) => {
                        setMaxDamage(value)
                    }}
                />
            </div>

            <div style={{ display: "flex", flexDirection: "row", position: "relative" }}>

                <div className="switchContainer">
                    <ToggleSwitch isChecked={isTypeEnabled} onToggle={() => setIsTypeEnabled(!isTypeEnabled)} />
                </div>

                <h2 style={{ marginLeft: "3vw" }}>Gewählte Gruppen</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "row", padding: "1vw" }}>
                <Checkbox
                    label="Lastenfahrrad"
                    isChecked={chosenBikes.lastenfahrrad}
                    disabled={!enabled || !isTypeEnabled}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ lastenfahrrad: !chosenBikes.lastenfahrrad } })
                    }}
                />
                <div style={{ width: "5vw" }} />
                <Checkbox
                    label="Kinderfahrrad"
                    isChecked={chosenBikes.kinderfahrrad}
                    disabled={!enabled || !isTypeEnabled}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ kinderfahrrad: !chosenBikes.kinderfahrrad } })
                    }}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "row", padding: 16 }}>
                <Checkbox
                    label="Damenfahrrad"
                    isChecked={chosenBikes.damenfahrrad}
                    disabled={!enabled || !isTypeEnabled}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ damenfahrrad: !chosenBikes.damenfahrrad } })
                    }}
                />
                <div style={{ width: "5vW" }} />
                <Checkbox
                    label="Mountainbike"
                    isChecked={chosenBikes.mountainbike}
                    disabled={!enabled || !isTypeEnabled}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ mountainbike: !chosenBikes.mountainbike } })
                    }}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "row", padding: 16 }}>
                <Checkbox
                    label="Herrenfahrrad"
                    isChecked={chosenBikes.herrenfahrrad}
                    disabled={!enabled || !isTypeEnabled}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ herrenfahrrad: !chosenBikes.herrenfahrrad } })
                    }}
                />
                <div style={{ width: "5vw" }} />
                <Checkbox
                    label="Rennrad"
                    isChecked={chosenBikes.rennrad}
                    disabled={!enabled || !isTypeEnabled}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ rennrad: !chosenBikes.rennrad } })
                    }}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "row", padding: 16 }}>
                <Checkbox
                    label="Fahrrad (?)"
                    isChecked={chosenBikes.fahrrad}
                    disabled={!enabled || !isTypeEnabled}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ fahrrad: !chosenBikes.fahrrad } })
                    }}
                />
                <div style={{ width: "5vw" }} />
                <Checkbox
                    label="Sonstiges"
                    isChecked={chosenBikes.sonstiges}
                    disabled={!enabled || !isTypeEnabled}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ sonstiges: !chosenBikes.sonstiges } })
                    }}
                />
            </div>
        </div>
    )
}

export default ControlPanel
