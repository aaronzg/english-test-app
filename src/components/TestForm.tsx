import { Button, HelperText, Label, Select } from 'flowbite-react'
import { Toast } from './Toast'
import React, { useState } from 'react'
import { useTestContext } from '../hooks/useTestContext'
export const TestForm = () => {
  const { setTestQuestions, tabsRef } = useTestContext()

  const testQuestionsOptions = [5, 10, 15, 20, 25, 30, 40, 50, 100]
  const [optionValue, setOptionValue] = useState<number>()
  const [errorMessage, setErrorMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const numberValue = Number(e.target.value)
    setOptionValue(numberValue)
    setErrorMessage((prev) => (e.target.value ? '' : prev))
  }

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!optionValue) return setErrorMessage('Elige una opcion')
    setTestQuestions(optionValue)
    setShowToast(true)
  }

  return (
    <>
      <div className='container px-5 py-6 rounded-xl space-y-3 md:bg-gray-700 max-w-max md:mx-auto md:mt-10'>
        <h1>Contesta para continuar</h1>

        <form onSubmit={handleSumbit} className='flex flex-col gap-4'>
          <div>
            <Label
              htmlFor='test-questions'
              color={errorMessage ? 'failure' : 'gray'}
            >
              Selecciona cuantas preguntas quieres
            </Label>
            <Select
              className='mt-1 md:max-w-2/3'
              id='test-questions'
              value={optionValue}
              onChange={handleChange}
              color={errorMessage ? 'failure' : 'gray'}
            >
              <option value=''>Selecciona</option>
              <option value={999}>Todas las preguntas</option>
              {testQuestionsOptions.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt} preguntas
                </option>
              ))}
            </Select>
            {errorMessage && <HelperText>{errorMessage}</HelperText>}
          </div>
          <Button type='submit' className='max-w-max'>
            Continuar
          </Button>
        </form>
      </div>

      <Toast
        onClose={() => setShowToast(false)}
        visible={showToast}
        buttons={[
          <button
            key={1}
            className='rounded-lg p-1.5 text-sm font-medium text-primary-600 hover:bg-primary-100 dark:text-primary-500 dark:hover:bg-gray-700'
            onClick={() => tabsRef.current?.setActiveTab(1)}
          >
            Ir
          </button>,
        ]}
      >
        <div className='text-sm font-normal'>Ya puedes acceder al test</div>
      </Toast>
    </>
  )
}
