import { useWhatQuestionContext } from "../hooks/useWhatQuestionContext"

export const Options = () => {
  const {
      id,
      data,
      onAnswer,
      answers,
      setAnswers,
    } = useWhatQuestionContext()
    
  const handleOptionClick = (option: string) => {
    const optionIndex = answers.findIndex((opt) => !opt)
    const optionValueIndex = data.options.findIndex((opt) => opt === option)
    if (option !== '' && optionIndex === -1) return
    const newAnswers = [...answers]
    newAnswers[optionIndex] = optionValueIndex.toString()
    setAnswers(newAnswers)
    onAnswer(id, newAnswers)
  }
  
  return (
    <div className='flex flex-wrap gap-2 mb-4'>
      {data.options
        .filter((_, i) => !answers.includes(i.toString()))
        .map((option, idx) => (
          <span
            key={idx}
            className='px-2 py-1 border rounded bg-gray-800 text-sm'
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </span>
        ))}
    </div>
  )
}
