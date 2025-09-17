import { useContext } from "react"
import { whatQuestionContext } from "../context/whatQuestionContext"

export const useWhatQuestionContext = () => {
  const {
    id,
    data,
    onAnswer,
    setToastText,
    setShowToast,
    setIsWrong
  } = useContext(whatQuestionContext)

  return {
    id,
    data,
    onAnswer,
    setToastText,
    setShowToast,
    setIsWrong
  }
}