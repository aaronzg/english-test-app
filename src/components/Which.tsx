import { useState } from 'react'
import type { WhichQuestion } from '../types'
import { whichQuestionContext } from '../context/whichQuestionContext'
import { WhichLines } from './WhichLines'
import { useAnswersContext } from '../hooks/useAnswersContext'

export default function Which({
  id,
  data,
  onAnswer,
}: {
  id: number
  data: WhichQuestion['data']
  onAnswer: (id: number, answer: string | string[]) => void
}) {
  const [isWrong, setIsWrong] = useState(false)

  const { finished } = useAnswersContext({})

  return (
    <whichQuestionContext.Provider value={{ id, data, onAnswer, setIsWrong }}>
      <div
        className={`base_question_card ${
          isWrong
            ? 'border border-red-500'
            : finished
            ? 'border border-green-500'
            : ''
        }`}
      >
        <div className='question_card_header'>
          <span className='question_number'>{id}</span>
          <h4 className='text-lg'>Which word?</h4>
        </div>
        <WhichLines />
      </div>
    </whichQuestionContext.Provider>
  )
}
