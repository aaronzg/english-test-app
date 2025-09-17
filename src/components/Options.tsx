import { useWhatQuestionContext } from "../hooks/useWhatQuestionContext"
import { useAnswersContext } from "../hooks/useAnswersContext"
import type { Dispatch, SetStateAction } from "react"
import type { UserAnswers } from "../types"

export const Options = () => {
  const {
      id,
      data
    } = useWhatQuestionContext()
    
  const { answers, setAnswers } = useAnswersContext({ id }) as {
    answers: string[]
    setAnswers: Dispatch<SetStateAction<UserAnswers>>
  }
    
  const handleOptionClick = (option: string) => {
    // Calcular el número total de blanks en las líneas
    const totalBlanks = data.lines.reduce((total, line) => {
      return total + (line.split('_').length - 1)
    }, 0)
    
    // Inicializar el array con el tamaño correcto si es necesario
    const currentAnswers = answers || Array(totalBlanks).fill('')
    
    // Asegurar que el array tenga el tamaño correcto
    while (currentAnswers.length < totalBlanks) {
      currentAnswers.push('')
    }
    
    const optionIndex = currentAnswers.findIndex((opt) => !opt)
    const optionValueIndex = data.options.findIndex((opt) => opt === option)
    
    if (option !== '' && optionIndex === -1) return
    
    const newAnswers = [...currentAnswers]
    newAnswers[optionIndex] = optionValueIndex.toString()
    
    // onAnswer(id, newAnswers)
    setAnswers(prev => ({...prev, [id]: newAnswers}))
  }
  return (
    <div className='flex flex-wrap gap-2 mb-4'>
      {data.options
        .filter((_, i) => !answers?.includes(i.toString()))
        .map((option, idx) => (
          <span
            key={idx}
            className='px-2 py-1 border border-stone-300 dark:border-blue-500 dark:text-blue-400 shadow-sm rounded text-sm'
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </span>
        ))}
    </div>
  )
}
