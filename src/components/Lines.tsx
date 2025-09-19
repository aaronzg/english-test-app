import { useEffect, type Dispatch, type SetStateAction } from 'react'
import { useAnswersContext } from '../hooks/useAnswersContext'
import { useWhatQuestionContext } from '../hooks/useWhatQuestionContext'
import type { UserAnswers } from '../types'

export const Lines = () => {
  const {
    id,
    data,
    setToastText,
    setShowToast,
    setIsWrong
  } = useWhatQuestionContext()

  const { errors, finished, answers, setAnswers } = useAnswersContext({ id }) as {
    errors: number[]
    finished: boolean
    answers: string[]
    setAnswers: Dispatch<SetStateAction<UserAnswers>>
  }

  // Verficar si el answers esta vacio (se reinicio) settear el isWrong a false
  useEffect(() => {
    if (!answers?.length || !finished) {
      setIsWrong(false)
    }
  }, [answers, finished, setIsWrong])

  const handleChange = (blankIndex: number, value: string) => {
    const newValue = Number(value)

    // Verificar si ya existe la respuesta (evitar duplicados)
    if (value !== '' && answers && answers.includes(value)) {
      setShowToast(true)
      setToastText(data.options[newValue])
      setTimeout(() => {
        setShowToast(false)
      }, 2500)
      return
    }

    // Crear nuevo array de respuestas o usar el existente
    const currentAnswers = answers || []
    const newAnswers = [...currentAnswers]
    
    // Asegurar que el array tenga el tamaño correcto
    while (newAnswers.length <= blankIndex) {
      newAnswers.push('')
    }

    newAnswers[blankIndex] = value

    setAnswers(prev => ({...prev, [id]: newAnswers }))
    // onAnswer(id, newAnswers)
  }

  let globalCounter = 0
  // utilidad para renderizar cada línea con selects en lugar de "_"
  const renderLine = (line: string, lineIndex: number) => {
    // divide por "_"
    const parts = line.split('_')
    return (
      <span key={lineIndex} className='block mb-2'>
        {parts.map((part, i) => {
          const needsBlank = i < parts.length - 1
          let blankIndex = -1
          if (needsBlank) {
            blankIndex = globalCounter++
          }
          if (errors?.includes(i)) {
            setIsWrong(true)
          }
          return (
            <span key={i}>
              {part}
              {needsBlank && (
                <select
                  id={id.toString() + i.toString()}
                  className={`question_select shadow-sm ${
                    errors?.includes(i)
                      ? 'border-b-red-500 shadow-xl text-red-800 dark:text-red-500 font-bold'
                      : finished ? 'border-b-green-500 text-green-500' : ''
                  } ${answers?.[blankIndex] ? !finished ? 'text-blue-700 dark:text-blue-500' : '' : ''}`}
                  value={answers?.[blankIndex] ?? ''}
                  onChange={(e) => handleChange(blankIndex, e.target.value)}
                  disabled={finished}
                  required
                >
                  <option value=''>-- choose --</option>
                  {data.options.map((option, idx) => (
                    <option key={idx} value={idx}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </span>
          )
        })}
      </span>
    )
  }

  return <div>{data.lines.map((line, index) => renderLine(line, index))}</div>
}
