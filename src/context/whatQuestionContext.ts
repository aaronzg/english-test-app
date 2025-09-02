import { createContext, type SetStateAction } from "react";
import type { WhatQuestion } from "../types";

interface WhatQuestionContext {
  id: number
  data: WhatQuestion['data']
  onAnswer: (id: number, answer: string | string[]) => void
  answers: string[]
  setAnswers: React.Dispatch<SetStateAction<string[]>>
  setToastText: React.Dispatch<SetStateAction<string>>
  setShowToast: React.Dispatch<SetStateAction<boolean>>
}

export const whatQuestionContext = createContext<WhatQuestionContext>({} as WhatQuestionContext)