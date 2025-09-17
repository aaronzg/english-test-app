import { createContext, type Dispatch, type SetStateAction } from "react"
import type { QuestionErrors, UserAnswers } from "../types"

export type AnswersContext = { errors: QuestionErrors, answers: UserAnswers, finished: boolean, setAnswers: Dispatch<SetStateAction<UserAnswers>> }
export const answersContext = createContext<AnswersContext>({} as AnswersContext)
