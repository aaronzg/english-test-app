import React, { createContext, type SetStateAction } from "react";
import type { WhichQuestion } from "../types";

interface WhichQuestionContext {
  id: number
  data: WhichQuestion['data']
  onAnswer: (id: number, answer: string | string[]) => void
  setIsWrong: React.Dispatch<SetStateAction<boolean>>
}
export const whichQuestionContext = createContext<WhichQuestionContext>(
  {} as WhichQuestionContext
)