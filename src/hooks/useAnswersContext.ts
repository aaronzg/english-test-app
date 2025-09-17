import { useContext } from 'react'
import { answersContext } from '../context/answersContex'

export const useAnswersContext = ({ id }: { id?: number }) => {
  const { errors, answers, finished, setAnswers, onAnswer, testId } = useContext(answersContext)
  if (!id) return { errors, answers, finished, setAnswers, onAnswer, testId }

  return { errors: errors[id], answers: answers[id], finished, setAnswers, onAnswer, testId }
}
