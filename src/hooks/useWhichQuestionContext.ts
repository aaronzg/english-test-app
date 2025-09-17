import { useContext } from "react"
import { whichQuestionContext } from "../context/whichQuestionContext"

export const useWhichQuestionContext = () => {
  const { id, data, onAnswer, setIsWrong } = useContext(whichQuestionContext)
  return { id, data, onAnswer, setIsWrong }
}