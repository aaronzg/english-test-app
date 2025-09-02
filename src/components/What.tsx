import type { WhatQuestion } from '../types'
import { Toast, ToastToggle } from 'flowbite-react'
import { useWhatQuestion } from '../hooks/useWhatQuestion'
import { whatQuestionContext } from '../context/whatQuestionContext'
import { Options } from './Options'
import { Lines } from './Lines'

export default function What({
  id,
  data,
  onAnswer,
}: {
  id: number
  data: WhatQuestion['data']
  onAnswer: (id: number, answer: string | string[]) => void
}) {
  // estado para guardar qué opción eligió el usuario en cada hueco
  const {
    answers,
    setAnswers,
    showToast,
    setShowToast,
    toastText,
    setToastText,
  } = useWhatQuestion({ data })

  return (
    <whatQuestionContext.Provider
      value={{
        id,
        data,
        onAnswer,
        answers,
        setAnswers,
        setToastText,
        setShowToast,
      }}
    >
      <div className='p-4 border rounded'>
        <h4 className='font-bold mb-2'>{id}. What’s the word?</h4>

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
