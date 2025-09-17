import React, { createContext, type SetStateAction } from "react";
import type { WhichQuestion } from "../types";

interface WhichQuestionContext {
  id: number
  data: WhichQuestion['data']
  setIsWrong: React.Dispatch<SetStateAction<boolean>>
}
export const whichQuestionContext = createContext<WhichQuestionContext>(
  {} as WhichQuestionContext
)