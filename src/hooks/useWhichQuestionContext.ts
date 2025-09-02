import { useContext } from "react"
import { whichQuestionContext } from "../context/whichQuestionContext"

export const useWhichQuestionContext = () => {
  const { id, data, answers, setAnswers, onAnswer } = useContext(whichQuestionContext)
  return { id, data, answers, setAnswers, onAnswer }
}