import { useAnswersContext } from '../hooks/useAnswersContext'
import { useWhichQuestionContext } from '../hooks/useWhichQuestionContext'
import type { WhichLine } from '../types'

export const WhichLines = () => {
  const { id, data, answers, setAnswers, onAnswer } = useWhichQuestionContext()

  const { errors } = useAnswersContext({ id }) as { errors: number[] }


  const handleChange = (lineIndex: number, blankIdx: number, value: string) => {
    const globalIndex =
      data.lines
        .slice(0, lineIndex)
        .reduce((acc, l) => acc + l.options.length, 0) + blankIdx

    const newAnswers = [...answers]

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
          const needsBlank = i < parts.length - 1
          return (
            <span key={i} className='text-base/loose'>
              {part}
              {needsBlank && (
                <select
                  className={`border rounded px-2 mx-1 bg-gray-800 ${
                    errors?.includes(i)
                      ? 'border-red-500 shadow-red-600 shadow-md'
                      : ''
                  }`}
                  onChange={(e) => handleChange(lineIndex, i, e.target.value)}
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
