import { useContext } from "react"
import { whatQuestionContext } from "../context/whatQuestionContext"

export const useWhatQuestionContext = () => {
  const {
    id,
    data,
    setToastText,
    setShowToast,
    setIsWrong
  } = useContext(whatQuestionContext)

  return {
    id,
    data,
    setToastText,
    setShowToast,
    setIsWrong
  }
}