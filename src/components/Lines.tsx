import { useAnswersContext } from '../hooks/useAnswersContext'
import { useWhatQuestionContext } from '../hooks/useWhatQuestionContext'

export const Lines = () => {
  const {
    id,
    data,
    onAnswer,
    answers,
    setAnswers,
    setToastText,
    setShowToast,
  } = useWhatQuestionContext()

  const { errors } = useAnswersContext({ id }) as { errors: number[] }

  const handleChange = (blankIndex: number, value: string) => {
    const newValue = Number(value)

    if (value !== '' && answers.includes(value)) {
      setShowToast(true)
      setToastText(data.options[newValue])
      setTimeout(() => {
        setShowToast(false)
      }, 2500)
      return
    }

    const newAnswers = [...answers]
    newAnswers[blankIndex] = value
    setAnswers(newAnswers)
    onAnswer(id, newAnswers)
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
          return (
            <span key={i}>
              {part}
              {needsBlank && (
                <select
                  id={id.toString() + i.toString()}
                  className={`border rounded px-2 py-1 mx-1 bg-gray-800 ${
                    errors?.includes(i)
                      ? 'border-red-500 shadow-md shadow-red-600'
                      : ''
                  }`}
                  value={answers[blankIndex] ?? ''}
                  onChange={(e) => handleChange(blankIndex, e.target.value)}
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
