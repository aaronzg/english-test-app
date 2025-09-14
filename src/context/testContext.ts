import type { TabsRef } from "flowbite-react";
import { createContext, type Dispatch, type RefObject, type SetStateAction } from "react";

type TestContext = {
  testQuestions: number
  setTestQuestions: Dispatch<SetStateAction<number>>
  setStartFrom: Dispatch<SetStateAction<number>>
  tabsRef: RefObject<TabsRef | null>
}

export const testContext = createContext<TestContext>({} as TestContext)