import { asignLetter } from '../helpers'
import type { OddOneQuestion } from '../types'
import { useContext } from 'react'
import { answersContext } from '../context/answersContex'
export default function OddOne({
  id,
  data,
  onAnswer
}: {
  id: number
  data: OddOneQuestion['data']
  onAnswer: (id: number, answer: string | string[]) => void
}) {

  const answers = useContext(answersContext)

  const isWrong = answers.errors[id]?.length > 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAnswer(id, e.target.value)
  }
  return (
    <div className={`p-4 border rounded ${isWrong ? 'question_wrong' : ''}`}>
      <h4>
        {id}. {data.question}
      </h4>{' '}
      <div>
        {' '}
        {data.options.map((option, i) => {
          const key = id.toString() + i.toString()
          return (
            <div className={`flex justify-between`} key={i}>
              <label htmlFor={key}>{asignLetter(i, option)}</label>
              <input
                type='radio'
                name={id.toString()}
                value={i}
                onChange={handleChange}
                id={key}
                required
              />
            </div>
          )
        })}{' '}
      </div>
    </div>
  )
}
