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
import type { TestType } from '../types'

const Test = () => {
  const [testQuestions, setTestQuestions] = useState<number>(-1)
  const [startFrom, setStartFrom] = useState<number>(-1)
  const [testArr, setTestArr] = useState<TestType[]>([]) 
  const tabsRef = useRef<TabsRef>(null)
  const [, setCurrentTab] = useState(0)
  
  // console.log(currentTab)
  const { tindex } = useParams()
  const testNumber = Number(tindex)
  
  useEffect(() => {
    const selectedTest = testNumber === 1 ? test_1 : test_2 
    const tests = sliceTest(selectedTest as TestType, testQuestions, startFrom)
    // console.log(sliceTest(selectedTest, 10))
    setTestArr(tests)
  },[testQuestions, testNumber]) 

  if (testNumber < 1 || testNumber > 2 || !testNumber) {
    return <NotFound />
  }
  
  return (
    <testContext.Provider value={{
      testQuestions,
      setTestQuestions,
      setStartFrom,
      tabsRef
    }}>
      <Tabs aria-label='Default tabs' variant='default' theme={{tablist: { variant: { default: "flex-nowrap overflow-x-scroll" }}}} ref={tabsRef} onActiveTabChange={(tab) => setCurrentTab(tab)}>
        <TabItem title='Form' active disabled={testQuestions >= 0}>
          <h1 className='text-center py-5'>Test book {testNumber + 1}</h1>
          <TestForm />
        </TabItem>
        {
          testQuestions <= 0 &&
          <TabItem title='Test' disabled={testQuestions <= 0}>
          </TabItem>
        }
        {
          testQuestions >= 0 &&
          testArr.map((test, id) => <TabItem title={`Test ${id + 1}/${testArr.length}`}><TestComponent currentTest={test} testId={id} isLast={id === testArr.length - 1} /></TabItem>)
        }
      </Tabs>

    </testContext.Provider>
  )
}

export default Test
