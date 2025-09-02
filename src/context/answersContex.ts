import { createContext } from "react"
import type { QuestionErrors } from "../types"

export type AnswersContext = { errors: QuestionErrors }
export const answersContext = createContext<AnswersContext>({} as AnswersContext)
