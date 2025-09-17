import { useContext } from "react"
import { whichQuestionContext } from "../context/whichQuestionContext"

export const useWhichQuestionContext = () => {
  const { id, data, setIsWrong } = useContext(whichQuestionContext)
  return { id, data, setIsWrong }
}