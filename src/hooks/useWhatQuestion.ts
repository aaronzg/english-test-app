import { useState } from "react"
import type { WhatQuestion } from "../types"

export const useWhatQuestion = ({ data } : {data : WhatQuestion['data']}) => {
  const [answers, setAnswers] = useState<string[]>(
    Array(data.correctOrder.length).fill('')
  )
  const [showToast, setShowToast] = useState(false)
  const [toastText, setToastText] = useState('')
  const [isWrong, setIsWrong] = useState(false)

  return { answers, setAnswers, showToast,setShowToast, toastText, setToastText, isWrong, setIsWrong}
}
