import { useContext } from "react"
import { testContext } from "../context/testContext"

export const useTestContext = () => {
  const { testQuestions, setTestQuestions, tabsRef } =
    useContext(testContext)

  return {
    testQuestions,
    setTestQuestions,
    tabsRef
  }
}