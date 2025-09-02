import { useContext } from 'react'
import { asignLetter } from '../helpers'
import type { ChooseQuestion } from '../types'
import { answersContext } from '../context/answersContex'

export default function Choose({
  data,
  id,
  onAnswer
}: {
  data: ChooseQuestion['data']
  id: number
  onAnswer: (id :number, answer: string | string[]) => void
}) {

  const answers = useContext(answersContext)

  const isWrong = answers.errors[id]?.length > 0
  
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    onAnswer(id, e.target.value)
  }

  return (
    <div className={`p-4 border rounded ${isWrong ? 'question_wrong' : ''}`}>
      <h4>{id}. {data.question}</h4>
      <ul className=''>
        {data.options.map((option, i) => {
          const key = id.toString() + i.toString()
          const optionText = asignLetter(i, option)

          return (
            <li key={key} className={`flex justify-between`}>
              <label htmlFor={key}>{optionText}</label>
              <input
                type='radio'
                name={id.toString()}
                id={key}
                value={i}
                onChange={handleChange}
                required
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
