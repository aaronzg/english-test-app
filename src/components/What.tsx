import type { WhatQuestion } from '../types'
import { Toast, ToastToggle } from 'flowbite-react'
import { useWhatQuestion } from '../hooks/useWhatQuestion'
import { whatQuestionContext } from '../context/whatQuestionContext'
import { Options } from './Options'
import { Lines } from './Lines'
import { useAnswersContext } from '../hooks/useAnswersContext'

export default function What({
  id,
  data
}: {
  id: number
  data: WhatQuestion['data']
}) {
  // estado para el toast y validaciones locales
  const {
    showToast,
    setShowToast,
    toastText,
    setToastText,
    isWrong,
    setIsWrong,
  } = useWhatQuestion({ data })

  const { finished } = useAnswersContext({})

  return (
    <whatQuestionContext.Provider
      value={{
        id,
        data,
        setToastText,
        setShowToast,
        setIsWrong,
      }}
    >
      <div
        className={`base_question_card ${
          isWrong
            ? 'border-red-500 border'
            : finished
            ? 'border-green-500 border'
            : ''
        }`}
      >
        <div className='question_card_header'>
          <span className='question_number'>{id}</span>
          <h4 className='text-lg'>What's the word?</h4>
        </div>

        <header>
          {/* Opciones disponibles */}
          <Options />
        </header>

        {/* Líneas con blanks */}
        <Lines />

        {showToast && (
          <Toast>
            <div className='text-sm'>
              Que <span className='font-bold text-gray-300'>{toastText}</span>{' '}
              ya esta cabron!!
            </div>
            <div className='ml-auto flex items-center space-x-2'>
              <ToastToggle onDismiss={() => setShowToast(false)} />
            </div>
          </Toast>
        )}
      </div>
    </whatQuestionContext.Provider>
  )
}
