import { useContext } from "react"
import { whatQuestionContext } from "../context/whatQuestionContext"

export const useWhatQuestionContext = () => {
  const {
    id,
    data,
    onAnswer,
    answers,
    setAnswers,
    setToastText,
    setShowToast,
  } = useContext(whatQuestionContext)

  return {
    id,
    data,
    onAnswer,
    answers,
    setAnswers,
    setToastText,
    setShowToast,
  }
}