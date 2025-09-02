import React, { createContext, type SetStateAction } from "react";
import type { WhichQuestion } from "../types";

type WhichQuestionContext = {
  id: number
  data: WhichQuestion['data']
  answers: string[]
  setAnswers: React.Dispatch<SetStateAction<string[]>>
  onAnswer: (id: number, answer: string | string[]) => void
}
export const whichQuestionContext = createContext<WhichQuestionContext>(
  {} as WhichQuestionContext
)