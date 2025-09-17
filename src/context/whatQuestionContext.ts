import { createContext, type SetStateAction } from "react";
import type { WhatQuestion } from "../types";

interface WhatQuestionContext {
  id: number
  data: WhatQuestion['data']
  setToastText: React.Dispatch<SetStateAction<string>>
  setShowToast: React.Dispatch<SetStateAction<boolean>>
  setIsWrong: React.Dispatch<SetStateAction<boolean>>
}

export const whatQuestionContext = createContext<WhatQuestionContext>({} as WhatQuestionContext)