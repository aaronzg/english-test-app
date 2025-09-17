import { useState } from 'react'
import type { TestType, UserAnswers, QuestionErrors } from '../types'
import exam from '../assets/test.json'

export const useTest = () => {
  const [currentTest, setCurrentTest] = useState<TestType>(exam as TestType)
  const [answers, setAnswers] = useState<UserAnswers>({})
  const [errors, setErrors] = useState<QuestionErrors>({})
  const [finished, setFinished] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [note, setNote] = useState({ percentage: 0, string: '' })
  const [showMessage, setShowMessage] = useState(false)

  return {
    currentTest,
    setCurrentTest,
    answers,
    setAnswers,
    errors,
    setErrors,
    finished,
    setFinished,
    showResults,
    setShowResults,
    note,
    setNote,
    showMessage,
    setShowMessage,
  }
}
