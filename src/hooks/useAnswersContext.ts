import { useContext } from 'react'
import { answersContext } from '../context/answersContex'

export const useAnswersContext = ({ id }: { id?: number }) => {
  const { errors, answers, finished, setAnswers } = useContext(answersContext)
  if (!id) return { errors, answers, finished, setAnswers }

  return { errors: errors[id], answers: answers[id], finished, setAnswers }
}
