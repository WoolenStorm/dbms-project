import CurrencyInput from "react-currency-input-field";
import Date from "./Date"
import Checkbox from "./Checkbox";
import { useEffect, useState } from "react";
import Toggle from "react-styled-toggle";

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

    useEffect(
        () => setTheftsToShow(filterThefts(chosenBikes, startDate, endDate, minDamage, maxDamage)),
        [chosenBikes, startDate, endDate, minDamage, maxDamage, filterThefts, setTheftsToShow]
    )

    const [isDateEnabled, setIsDateEnabled] = useState(true)
    const [isDamageEnabled, setIsDamageEnabled] = useState(true)
    const [isTypeEnabled, setIsTypeEnabled] = useState(true)

    return (
        <div style={{ paddingLeft: 24 }}>

            <div style={{ display: "flex", flexDirection: "row", position: "relative" }}>

                <div className="switchContainer">
                    <Toggle checked={isDateEnabled} onChange={() => setIsDateEnabled(!isDateEnabled)}
                        width={53} height={25} sliderWidth={20} sliderHeight={20}
                        backgroundColorChecked="#49967F" backgroundColorUnchecked="#3B3955" backgroundColorButton="#36FCC0"
                    />
                </div>

                <h2 style={{ marginLeft: 64 }}>Datum</h2>
            </div>


            <div style={{ display: "flex", flexDirection: "row" }}>
                <Date placeholder="von" value={startDate} setValue={setStartDate} disabled={!enabled || !isDateEnabled} />
                <div style={{ width: 64 }} />
                <Date placeholder="bis" value={endDate} setValue={setEndDate} disabled={!enabled || !isDateEnabled} />
            </div>

            <div style={{ display: "flex", flexDirection: "row", position: "relative" }}>

                <div className="switchContainer">
                    <Toggle
                        checked={isDamageEnabled} onChange={() => setIsDamageEnabled(!isDamageEnabled)}
                        width={53} height={25} sliderWidth={20} sliderHeight={20}
                        backgroundColorChecked="#49967F" backgroundColorUnchecked="#3B3955" backgroundColorButton="#36FCC0"
                    />
                </div>

                <h2 style={{ marginLeft: 64 }}>Schadenshöhe</h2>
            </div>



            <div style={{ display: "flex", flexDirection: "row" }}>
                <CurrencyInput
                    className="currencyInput"
                    placeholder="von"
                    defaultValue={minDamage}
                    decimalsLimit={0}
                    prefix="€"
                    disabled={!enabled || !isDamageEnabled}
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
                    disabled={!enabled || !isDamageEnabled}
                    onValueChange={(value, _) => {
                        setMaxDamage(value)
                    }}
                />
            </div>

            <div style={{ display: "flex", flexDirection: "row", position: "relative" }}>

                <div className="switchContainer">
                    <Toggle
                        checked={isTypeEnabled} onChange={() => setIsTypeEnabled(!isTypeEnabled)}
                        width={53} height={25} sliderWidth={20} sliderHeight={20}
                        backgroundColorChecked="#49967F" backgroundColorUnchecked="#3B3955" backgroundColorButton="#36FCC0"
                    />
                </div>

                <h2 style={{ marginLeft: 64 }}>Gewählte Gruppen</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "row", padding: 16 }}>
                <Checkbox
                    label="Lastenfahrrad"
                    isChecked={chosenBikes.lastenfahrrad}
                    disabled={!enabled || !isTypeEnabled}
                    setChecked={() => {
                        setChosenBikes({ ...chosenBikes, ...{ lastenfahrrad: !chosenBikes.lastenfahrrad } })
                    }}
                />
                <div style={{ width: 98 }} />
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
                <div style={{ width: 98 }} />
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
                <div style={{ width: 98 }} />
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
                <div style={{ width: 98 }} />
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
