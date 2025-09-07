import React from 'react'
import type { QuestionErrors, TestType } from '../types'
import Choose from '../components/Choose'
import OddOne from '../components/OddOne'
import What from '../components/What'
import Which from '../components/Which'
import { buildAnswerMap, flatAnswers, flatCorrectAnswers } from '../helpers'
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
//import test_book_2 from '../assets/test_book2.json'
type TestComponentProps = {
  currentTest: TestType
  testId: number
  isLast?: boolean
}

export default function TestComponent({ currentTest, testId, isLast } : TestComponentProps) {
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
  } = useTest()

  const { tabsRef } = useTestContext()

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault()

    if (finished && isLast) return location.reload()
    if (finished) return tabsRef.current?.setActiveTab(testId + 2)

    const correctAnswers = flatCorrectAnswers(currentTest)
    const userAnswers = flatAnswers(currentTest, answers)
    const answerMap = buildAnswerMap(currentTest)

    const score = userAnswers.reduce(
      (counter, ans, i) => (ans === correctAnswers[i] ? counter + 1 : counter),
      0
    )

    const errors: QuestionErrors = {}

    Object.entries(answerMap).forEach(([qId, index]) => {
      const qIdNum = Number(qId)

      errors[qIdNum] = []

      index.forEach((globalIdx, localIdx) => {
        if (userAnswers[globalIdx] !== correctAnswers[globalIdx]) {
          errors[qIdNum].push(localIdx)
        }
      })
    })
    setErrors(errors)
    setFinished(true)
    setShowResults(true)
    setNote({
      percentage: (score * 100) / correctAnswers.length,
      string: `${score} / ${correctAnswers.length}`,
    })
  }

  const handleAnswer = (id: number, answer: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: answer }))
  }

  return (
    <div>
      
      <form
        className='bg-gray-700 flex flex-col gap-8 mx-6 rounded-2xl p-4 my-8 max-w-2xl md:mx-auto'
        onSubmit={handleSumbit}
      >
        <answersContext.Provider value={{ errors }}>
          {currentTest.map((question, idx) => {
            const { id } = question
            if (question.type === 'choose') {
              return (
                <Choose data={question.data} id={id} key={idx} onAnswer={handleAnswer} />
              )
            }
            if (question.type === 'odd-one-out') {
              return (
                <OddOne data={question.data} id={id} key={idx} onAnswer={handleAnswer} />
              )
            }
            if (question.type === 'whats-the-word') {
              return (
                <What data={question.data} id={id} key={idx} onAnswer={handleAnswer} />
              )
            }
            if (question.type === 'which-word') {
              return (
                <Which data={question.data} id={id} key={idx} onAnswer={handleAnswer} />
              )
            }
          })}

          <button
            type='submit'
            className='bg-blue-500 rounded-full font-semibold border-white border-2 py-2 w-2xs self-center'
          >
            {finished && isLast ? 'Reiniciar' : 'Siguiente'}
          </button>
        </answersContext.Provider>
      </form>

      <Modal show={showResults} onClose={() => setShowResults(false)}>
        <ModalHeader>Tu putuación vato</ModalHeader>
        <ModalBody>
          <Chart percentage={note.percentage} label={note.string} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setShowResults(false)}>Ta bueno</Button>
          <Button onClick={() => setShowResults(false)} color='dark'>
            No mames!
          </Button>
        </ModalFooter>
      </Modal>
      
    </div>
  )
}
