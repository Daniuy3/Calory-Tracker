import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import "react-calendar/dist/Calendar.css"
import "react-date-picker/dist/DatePicker.css"
import { useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


function ExpenseForm() {
    const {state, dispatch, remainingBudget} = useBudget()
    const [error, setError] = useState("")
    const [previousAmount, setPrevousAmount] = useState(0)

    const [expense, setExpense] = useState<DraftExpense>({
        amount:0,
        expenseName: "",
        category: "",
        date: new Date()
    })
        
    
    useEffect(() => {
        if(state.editingId){
            const editingExpense = state.expenses.filter(expense => expense.id === state.editingId)[0]

            setExpense(editingExpense)
            setPrevousAmount(editingExpense.amount)
        }
    },[state.editingId])

    

    

    const handleChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) =>{
        const {name, value} = e.target

        const isAmountField = ["amount"].includes(name)
        
        setExpense({
            ...expense,
            [name]: isAmountField? +value : value
        })
        
    }
    const handleChangeDate = (value: Value) => {
        
        setExpense({
            ...expense,
            date: value
        })
    } 

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        if(Object.values(expense).includes("")){
            setError("Todos los campos son Obligatorios")
            return
        }

        if((expense.amount - previousAmount) > remainingBudget){
            setError("Ese gasto supera tu presupuesto!")
            return
        }
        /* Agregar un nuevo gasto o actualizar*/
        if(state.editingId){
            dispatch({type: "update-expense", payload: {expense: {id:state.editingId, ...expense}}})
        }else{
            dispatch({type: "add-expense", payload:{expense}})
        }
       
        /* Reiniciar State */
        setExpense({
            amount:0,
            expenseName: "",
            category: "",
            date: new Date()
        })
        setPrevousAmount(0)
    }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend className=" uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">{state.editingId? "Guardar cambios": "Nuevo Gasto"}</legend>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="expenseName"
                className="text-xl"
            >
                Nombre Gasto: 
            </label>
            <input 
                type="text"
                name="expenseName" 
                id="expenseName"
                placeholder="Añade el nombre del gasto.."
                className="bg-slate-100 p-2"
                value={expense.expenseName}
                onChange={handleChange}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="amount"
                className="text-xl"
            >
                Cantidad: 
            </label>
            <input 
                type="number"
                name="amount" 
                id="amount"
                placeholder="Añade la cantidad del gasto: ej. 300"
                className="bg-slate-100 p-2"
                value={expense.amount}
                onChange={handleChange}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="category"
                className="text-xl"
            >
                Categoria: 
            </label>
            <select
                name="category" 
                id="category"
                className="bg-slate-100 p-2"
                value={expense.category}
                onChange={handleChange}
            >
                <option value="" selected disabled>-- Seleccione --</option>
                {categories.map(category =>(
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
        </div>
        
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="amount"
                className="text-xl"
            >
                Fecha Gasto: 
            </label>
            <DatePicker
                className="bg-slate-100 p-2 border-0"
                value={expense.date}
                onChange={handleChangeDate}
            />
        </div>

        <input 
            type="submit"
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg hover:bg-blue-800 transition-colors duration-300"
            value={state.editingId? "Guardar cambios": "Registrar Gasto"}
         />

    </form>
  )
}

export default ExpenseForm