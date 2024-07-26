import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

function BudgetForm() {

    const [budget, setBudget] = useState(0)
    const {dispatch} = useBudget()

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setBudget(+e.target.value)
    }
    
    const isValid = useMemo(() => {

        return isNaN(budget) || budget <=0
        
    },[budget])

    const handleSumbit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        dispatch({type : "add-budget", payload:{budget}})
    }
    
  return (
    <form className="space-y-5" onSubmit={handleSumbit}>
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">Definir Presupuesto</label>
            <input 
                type="number"
                className="w-full bg-white border border-gray-200 p-2 focus:border-blue-600"
                placeholder="Define tu presupuesto"
                name="budget" 
                id="budget"
                value={budget}
                onChange={handleChange}
            />
        </div>

        <input type="submit"  value="Definir Presupuesto"
            className="bg-blue-600 hover:bg-blue-700 hover:text-gray-200 cursor-pointer w-full p-2 text-white font-black uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-default"
            disabled={isValid}
            
        />
    </form>
  )
}

export default BudgetForm