import { useParams } from 'react-router'
import TestComponent from '../components/TestComponent'
import { NotFound } from './NotFound'
import { testContext } from '../context/testContext'
import { useEffect, useRef, useState } from 'react'
import { TabItem, Tabs, type TabsRef } from 'flowbite-react'
import { TestForm } from '../components/TestForm'
import test_2 from '../assets/test_book3.test.json'
import test_1 from '../assets/test_book2.json'
import { sliceTest } from '../helpers'
import type { GlobalTestData, TestType, UserAnswers } from '../types'
import { usePersistence } from '../hooks/usePersistence'

const Test = () => {
  const [testQuestions, setTestQuestions] = useState<number>(-1)
  const [startFrom, setStartFrom] = useState<number>(-1)
  const [testArr, setTestArr] = useState<TestType[]>([])
  const tabsRef = useRef<TabsRef>(null)
  const [globalTestData, setGlobalTestData] = useState<GlobalTestData>({})

  const { tindex } = useParams()
  const testNumber = Number(tindex)

  const {
    saveTestData,
    loadTestData,
    saveCurrentTab,
    loadCurrentTab,
    loadInitialValues,
    clearAllTestData,
  } = usePersistence(testNumber)

  const handleTabChange = (tab: number) => {
    saveCurrentTab(tab)
  }

  useEffect(() => {
    const initialValues = loadInitialValues()
    if (initialValues) {
      setTestQuestions(initialValues.optionValue)
      setStartFrom(initialValues.startValue)
    }

    const lastTab = loadCurrentTab()
    if (lastTab !== null) {
      setTimeout(() => {
        tabsRef?.current?.setActiveTab(lastTab)
      }, 1000)
    }

    const lastTestData = loadTestData()
    setGlobalTestData(lastTestData)
  }, [testNumber, loadInitialValues, loadCurrentTab, loadTestData])

  useEffect(() => {
    const selectedTest = testNumber === 1 ? test_1 : test_2
    const tests = sliceTest(selectedTest as TestType, testQuestions, startFrom)
    // console.log(sliceTest(selectedTest, 10))
    setTestArr(tests)
  }, [testQuestions, startFrom, testNumber])

  const handleAnswer = (testId: number, answers: UserAnswers) => {
    setGlobalTestData((prev) => {
      const newData = {
        ...prev,
        [testId]: {
          answers,
          finished: prev[testId]?.finished || false,
        },
      }

      saveTestData(newData)
      return newData
    })
  }

  const handleFinish = (testId: number, finished: boolean) => {
    setGlobalTestData((prev) => {
      const newData = {
        ...prev,
        [testId]: {
          answers: prev[testId]?.answers || {},
          finished,
        },
      }

      saveTestData(newData)
      return newData
    })
  }

  if (testNumber < 1 || testNumber > 2 || !testNumber) {
    return <NotFound />
  }

  return (
    <testContext.Provider
      value={{
        testQuestions,
        setTestQuestions,
        setStartFrom,
        startFrom,
        tabsRef,
        testNumber,
        globalTestData,
        clearAllTestData,
      }}
    >
      <div className='bg-base-white dark:bg-gradient-to-br min-h-screen dark:from-black dark:via-gray-900 dark:to-black'>
        <Tabs
          aria-label='Default tabs'
          variant='default'
          theme={{
            tablist: {
              variant: { default: 'flex-nowrap overflow-x-scroll' },
              tabitem: {
                variant: {
                  default: {
                    active: {
                      on: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white dark:text-white disabled:dark:text-white',
                      off: 'hover:bg-gradient-to-br hover:from-pink-600 hover:to-indigo-600',
                    },
                  },
                },
              },
            },
          }}
          ref={tabsRef}
          onActiveTabChange={(tab) => handleTabChange(tab)}
        >
          <TabItem title='Form' active>
            <div className='bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
              <h1 className='text-center py-5'>Test book {testNumber + 1}</h1>
            </div>
            <TestForm />
          </TabItem>
          {testQuestions <= 0 && (
            <TabItem title='Test' disabled={testQuestions <= 0}></TabItem>
          )}
          {testQuestions >= 0 &&
            testArr.map((test, id) => (
              <TabItem title={`Test ${id + 1}/${testArr.length}`}>
                <TestComponent
                  onFinish={handleFinish}
                  onAnswer={handleAnswer}
                  currentTest={test}
                  testId={id}
                  isLast={id === testArr.length - 1}
                />
              </TabItem>
            ))}
        </Tabs>
      </div>
    </testContext.Provider>
  )
}

export default Test
