import React, { useEffect } from 'react'
import type { TestType, UserAnswers } from '../types'
import Choose from '../components/Choose'
import OddOne from '../components/OddOne'
import What from '../components/What'
import Which from '../components/Which'
import {
  calculateUserScore,
  flatAnswers,
  flatCorrectAnswers,
  getUserErrors,
  scrollToTop,
} from '../helpers'
import { answersContext } from '../context/answersContex'
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'flowbite-react'
import { Chart } from '../components/Chart'
import { useTest } from '../hooks/useTest'
import { useTestContext } from '../hooks/useTestContext'
import { Toast } from './Toast'
//import test_book_2 from '../assets/test_book2.json'
type TestComponentProps = {
  currentTest: TestType
  testId: number
  isLast?: boolean
  onFinish: (testId: number, finished: boolean) => void
  onAnswer: (testId: number, answers: UserAnswers) => void
}

export default function TestComponent({
  currentTest,
  testId,
  isLast,
  onFinish,
  onAnswer,
}: TestComponentProps) {
  const {
    answers,
    setAnswers,
    errors,
    setErrors,
    finished,
    setFinished,
    showResults,
    setShowResults,
    note,
    setNote,
    showMessage,
    setShowMessage,
  } = useTest()

  const { tabsRef, testQuestions, startFrom, globalTestData, clearAllTestData } = useTestContext()

  // Cargar datos persistidos al inicializar el componente
  useEffect(() => {
    const testData = globalTestData[testId]
    if (testData) {
      if (testData.answers) {
        setAnswers(testData.answers)
      }
      if (testData.finished) {
        setFinished(testData.finished)
        // Si ya está terminado, calcular los resultados
        const { percentage, string } = calculateUserScore(currentTest, testData.answers)
        const newErrors = getUserErrors(currentTest, testData.answers)
        setErrors(newErrors)
        setNote({ percentage, string })
      }
    }
  }, [testId, globalTestData, currentTest, setAnswers, setFinished, setErrors, setNote])


  const checkTest = () => {
    const isFinished =
      flatAnswers(currentTest, answers).length ===
      flatCorrectAnswers(currentTest).length
    if (!isFinished) {
      return setShowMessage(true)
    }
    if (note.string) {
      return setShowResults(true)
    }

    const { percentage, string } = calculateUserScore(currentTest, answers)

    const newErrors = getUserErrors(currentTest, answers)

    setFinished(isFinished)
    onFinish(testId, isFinished)

    setErrors(newErrors)
    setShowResults(true)
    setNote({
      percentage,
      string,
    })
  }

  const resetCurrentTest = () => {
    // Resetear solo el test actual
    setAnswers({})
    setErrors({})
    setFinished(false)
    setShowResults(false)
    setNote({ percentage: 0, string: '' })
    setShowMessage(false)
    
    // Llamar onAnswer para limpiar los datos persistidos de este test
    onAnswer(testId, {})
    onFinish(testId, false)
    scrollToTop()
  }

  const resetAllTests = () => {
    // Limpiar todos los datos de localStorage
    clearAllTestData()
    // Recargar la página para reiniciar completamente
    location.reload()
  }

  const handleSeeResults = () => {
    setShowMessage(false)
    checkTest()
  }

  const handleAnswer = (id: number, answer: string | string[]) => {
    setAnswers((prev) => {
      onAnswer(testId, { ...prev, [id]: answer })
      return { ...prev, [id]: answer }
    })
  }

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault()
    resetAllTests()
  }

  const handleNext = () => {
    tabsRef.current?.setActiveTab(testId + 2)
    scrollToTop()
  }

  const handlePrevious = () => {
    tabsRef.current?.setActiveTab(testId)
    scrollToTop()
  }

  return (
    <div>
      <header>
        <div className='font-semibold max-w-2xl mx-10 px-3 py-4 shadow-sm bg-white dark:bg-gradient-to-r dark:from-gray-950 dark:to-stone-950 dark:text-blue-400 dark:border dark:border-blue-500 rounded-lg'>
          <span>
            Questions {testId * testQuestions + startFrom + 1} -{' '}
            {testId * testQuestions + testQuestions + startFrom}
          </span>
        </div>
      </header>
      <form
        className='flex flex-col gap-8 mx-6 rounded-2xl p-4 mb-8 mt-4 max-w-2xl md:mx-auto'
        onSubmit={handleSumbit}
      >
        <answersContext.Provider
          value={{ errors, answers, setAnswers, finished }}
        >
          {currentTest.map((question, idx) => {
            const { id } = question
            if (question.type === 'choose') {
              return (
                <Choose
                  data={question.data}
                  id={id}
                  key={idx}
                  onAnswer={handleAnswer}
                />
              )
            }
            if (question.type === 'odd-one-out') {
              return (
                <OddOne
                  data={question.data}
                  id={id}
                  key={idx}
                  onAnswer={handleAnswer}
                />
              )
            }
            if (question.type === 'whats-the-word') {
              return (
                <What
                  data={question.data}
                  id={id}
                  key={idx}
                  onAnswer={handleAnswer}
                />
              )
            }
            if (question.type === 'which-word') {
              return (
                <Which
                  data={question.data}
                  id={id}
                  key={idx}
                  onAnswer={handleAnswer}
                />
              )
            }
          })}

          <section className='flex flex-col gap-2 items-center'>
            <button
              type='button'
              onClick={handleSeeResults}
              className='test_button m-0 md:mx-0'
            >
              <i className='bx bx-book-alt'></i>
              Watch my results
            </button>
            <button
              type='button'
              className='test_button m-0 md:mx-0'
              onClick={resetCurrentTest}
            >
              <i className='bx bx-reset'></i>
              Reset this test
            </button>
            <div className='flex gap-2 items-start justify-between'>
              {/* Button to previous tab */}
              {testId !== 0 && (
                <button
                  type='button'
                  className='test_button'
                  onClick={handlePrevious}
                >
                  <i className='bx bx-left-arrow'></i>
                  Questions <br />
                  {testId * testQuestions - testQuestions + startFrom} -{' '}
                  {testId * testQuestions + startFrom}
                </button>
              )}

              {/* Button to next tab */}
              {!isLast && (
                <button
                  type='button'
                  className='test_button'
                  onClick={handleNext}
                >
                  Questions <br />
                  {testId * testQuestions +
                    testQuestions +
                    1 +
                    startFrom} -{' '}
                  {testId * testQuestions + testQuestions * 2 + startFrom}
                  <i className='bx bx-right-arrow'></i>
                </button>
              )}
            </div>
          </section>

          <button
            type='button'
            onClick={resetAllTests}
            className='bg-gradient-to-r from-blue-600 via-pink-600 to-indigo-600 rounded-full text-white font-semibold py-2 w-2xs self-center
            shadow-sm transition-all hover:shadow-md focus:outline-none select-none 
            active:border active:border-white active:scale-95 active:shadow-inner active:bg-gradient-to-r active:from-indigo-600 active:via-pink-600 active:to-blue-600 active:bg-clip-text active:text-transparent'
          >
            {'Reset all'}
          </button>
        </answersContext.Provider>
      </form>

      <Modal show={showResults} onClose={() => setShowResults(false)}>
        <ModalHeader>Tu putuación vato</ModalHeader>
        <ModalBody>
          <Chart percentage={note.percentage} label={note.string} />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => setShowResults(false)}
            className='button_gradient'
          >
            Ta bueno
          </Button>
          <Button onClick={() => setShowResults(false)} color='dark'>
            No mames!
          </Button>
        </ModalFooter>
      </Modal>

      <Toast visible={showMessage} onClose={() => setShowMessage(false)}>
        Primero tienes que finalizar el test
      </Toast>
    </div>
  )
}
