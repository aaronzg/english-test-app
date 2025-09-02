import { useContext } from "react"
import { answersContext } from "../context/answersContex"

export const useAnswersContext = ({ id } : { id?: number }) => {
    const context = useContext(answersContext)
    const errors = context.errors
    if(!id) return { errors }

    return { errors: errors[id] };
}