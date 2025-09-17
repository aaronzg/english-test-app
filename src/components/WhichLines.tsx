import { useAnswersContext } from '../hooks/useAnswersContext'
import { useWhichQuestionContext } from '../hooks/useWhichQuestionContext'
import type { WhichLine } from '../types'

export const WhichLines = () => {
  const { id, data, onAnswer, setIsWrong } = useWhichQuestionContext()

  const { errors, finished, answers, setAnswers } = useAnswersContext({ id }) as {
    errors: number[]
    finished: boolean
    answers: string[]
    setAnswers: (answers: string[]) => void
  } 

  const handleChange = (lineIndex: number, blankIdx: number, value: string) => {
    const globalIndex =
      data.lines
        .slice(0, lineIndex)
        .reduce((acc, l) => acc + l.options.length, 0) + blankIdx

    // Calcular el número total de opciones para inicializar el array correctamente
    const totalOptions = data.lines.reduce((acc, line) => {
      return acc + line.options.length
    }, 0)

    // Inicializar el array con el tamaño correcto si es necesario
    const currentAnswers = answers || Array(totalOptions).fill('')
    
    // Asegurar que el array tenga el tamaño correcto
    while (currentAnswers.length < totalOptions) {
      currentAnswers.push('')
    }

    const newAnswers = [...currentAnswers]
    newAnswers[globalIndex] = value || ''

    setAnswers(newAnswers)
    onAnswer(id, newAnswers)
  }

  const renderLine = (line: WhichLine, lineIndex: number) => {
    // divide por "_"
    const parts = line.text.split('_')

    return (
      <span key={lineIndex} className='block mb-2'>
        {parts.map((part, i) => {

          const globalIndex =
            data.lines
              .slice(0, lineIndex)  
              .reduce((acc, l) => acc + l.options.length, 0) + i
          if(Array.isArray(errors) && errors.includes(i)) {
            setIsWrong(true)
          }
          const needsBlank = i < parts.length - 1
          return (
            <span key={i} className='text-base/loose'>
              {part}
              {needsBlank && (
                <select
                  className={`question_select shadow-sm ${
                    Array.isArray(errors) && errors.includes(i)
                      ? 'border-red-500 shadow-xl text-red-500'
                      : finished ? 'border-green-500 text-green-600' : ''
                  } ${answers?.[globalIndex] ? 'border-blue-500 text-blue-700' : ''}`}
                  onChange={(e) => handleChange(lineIndex, i, e.target.value)}
                  disabled={finished}
                  value={answers?.[globalIndex] ?? ''}
                  required
                >
                  <option value=''>-- choose --</option>
                  {line.options[i].map((option, idx) => {
                    return (
                      <option key={idx} value={idx}>
                        {option}
                      </option>
                    )
                  })}
                </select>
              )}
            </span>
          )
        })}
      </span>
    )
  }

  return <div>{data.lines.map((line, idx) => renderLine(line, idx))}</div>
}
