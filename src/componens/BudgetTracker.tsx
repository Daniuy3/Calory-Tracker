import {CircularProgressbar, buildStyles} from "react-circular-progressbar"

import { useBudget } from "../hooks/useBudget"
import AmountDisplay from "./AmountDisplay"
import { useMemo } from "react"

import "react-circular-progressbar/dist/styles.css"

function BudgetTracker() {
    const {state, remainingBudget, totalExpenses, dispatch} = useBudget()

    const Percentage = +useMemo(() => (totalExpenses *100/state.budget) ,[state.expenses]).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <CircularProgressbar
                value={Percentage}
                styles={buildStyles({
                    pathColor: Percentage === 100? "#DC2626" : "#3b82f6",
                    trailColor:"#F5F5F5",
                    textSize: 14,
                    textColor:Percentage === 100? "#DC2626" : "#3b82f6"
                })}
                text={`${Percentage} %`}
            />
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
            <button 
                className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg hover:bg-pink-800 transition-colors duration-300"
                type="button"
                onClick={() => dispatch({type: "reset-app"})}
            >
                    Resetear App
            </button>

            <AmountDisplay
                label="Presupuesto"
                amount={state.budget}
            />

            <AmountDisplay
                label="Disponible"
                amount={remainingBudget}
            />

            <AmountDisplay
                label="Gastado"
                amount={totalExpenses}
            />
        </div>
    </div>
  )
}

export default BudgetTracker