import { useContext } from "react"
import { testContext } from "../context/testContext"

export const useTestContext = () => {
  const { testQuestions, setTestQuestions, tabsRef, setStartFrom } =
    useContext(testContext)

  return {
    testQuestions,
    setTestQuestions,
    tabsRef,
    setStartFrom
  }
}