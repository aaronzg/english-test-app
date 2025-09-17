import type { TabsRef } from "flowbite-react";
import { createContext, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { GlobalTestData } from "../types";

type TestContext = {
  testQuestions: number
  setTestQuestions: Dispatch<SetStateAction<number>>
  setStartFrom: Dispatch<SetStateAction<number>>
  startFrom: number
  tabsRef: RefObject<TabsRef | null>
  testNumber: number
  globalTestData: GlobalTestData
  clearAllTestData: () => void
}

export const testContext = createContext<TestContext>({} as TestContext)