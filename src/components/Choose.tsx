import { useContext } from 'react'
import { asignLetter } from '../helpers'
import type { ChooseQuestion } from '../types'
import { answersContext } from '../context/answersContex'

export default function Choose({
  data,
  id,
  onAnswer,
}: {
  data: ChooseQuestion['data']
  id: number
  onAnswer: (id: number, answer: string | string[]) => void
}) {
  const answers = useContext(answersContext)
  const currentAnswer = answers.answers[id] as string
  const isFinished = answers.finished

  const isWrong = answers.errors[id]?.length > 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAnswer(id, e.target.value)
  }

  return (
    <div
      className={`base_question_card ${
        isWrong
          ? 'border-red-400 border'
          : isFinished
          ? 'bg-white dark:bg-black border-green-400 border'
          : 'bg-white dark:bg-black'
      }`}
    >
      <div className='flex items-center gap-2'>
        <span className='bg-stone-700 rounded-full aspect-square h-9 text-white text-center flex items-center justify-center'>
          {id}
        </span>
        <h4 className='text-lg'>{data.question}</h4>
      </div>
      <ul className='flex flex-col gap-2'>
        {data.options.map((option, i) => {
          const key = id.toString() + i.toString()
          const optionLetter = asignLetter(i)
          return (
            <li
              key={key}
              className={`flex justify-between pr-2 transition-all duration-100 rounded-full border-2 ${
                currentAnswer === i.toString()
                  ? isWrong
                    ? 'border-red-600 bg-red-200 dark:text-black'
                    : isFinished
                    ? 'border-green-500 bg-green-200 dark:text-black'
                    : 'border-stone-200 dark:bg-transparent'
                  : data.correctAnswer === i
                  ? isFinished
                    ? 'border-green-600 bg-green-200 dark:text-black'
                    : 'border-transparent bg-white dark:bg-transparent'
                  : 'border-transparent'
              }`}
            >
              <label
                htmlFor={key}
                className='flex items-center gap-2 font-semibold'
              >
                <span
                  className={`aspect-square text-lg h-8 rounded-full flex items-center justify-center font-semibold ${
                    currentAnswer === i.toString()
                      ? isWrong
                        ? 'bg-red-600 text-white'
                        : isFinished
                        ? 'bg-green-500 text-white'
                        : 'bg-stone-200 dark:text-black'
                      : data.correctAnswer === i
                      ? isFinished
                        ? 'bg-green-500 text-white'
                        : 'bg-stone-200 dark:text-black'
                      : 'bg-stone-200 dark:text-black'
                  }`}
                >
                  {optionLetter}
                </span>
                {option}
              </label>
              <input
                type='radio'
                name={id.toString()}
                id={key}
                value={i}
                checked={currentAnswer === i.toString()}
                onChange={handleChange}
                disabled={isFinished}
                required
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
