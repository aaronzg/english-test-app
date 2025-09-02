import { useState } from 'react'
import type { WhichQuestion } from '../types'
import { whichQuestionContext } from '../context/whichQuestionContext'
import { WhichLines } from './WhichLines'

export default function Which({
  id,
  data,
  onAnswer,
}: {
  id: number
  data: WhichQuestion['data']
  onAnswer: (id: number, answer: string | string[]) => void
}) {
  const totalOptions = data.lines.reduce((acc, line) => {
    const result = acc + line.options.length
    return result
  }, 0)

  const [answers, setAnswers] = useState<string[]>(Array(totalOptions).fill(''))

  return (
    <whichQuestionContext.Provider
      value={{ id, data, answers, setAnswers, onAnswer }}
    >
      <div className='p-4 border rounded'>
        <h4>{id}. Which</h4>
        <WhichLines />
      </div>
    </whichQuestionContext.Provider>
  )
}
