// Base interface
interface QuestionBase {
  id: number
}

export type QuestionErrors = Record<number, number[]>


export type UserAnswers = Record<number, string | string[]>

// Which-word line
export type WhichLine = {
  text: string
  options: string[][]
  correctAnswers: number[]
}

// Choose question
export interface ChooseQuestion extends QuestionBase {
  type: 'choose'
  data: {
    question: string
    options: string[]
    correctAnswer: number
  }
}

// Which word question
export interface WhichQuestion extends QuestionBase {
  type: 'which-word'
  data: {
    lines: WhichLine[]
  }
}

// What's the word question
export interface WhatQuestion extends QuestionBase {
  type: 'whats-the-word'
  data: {
    lines: string[]
    options: string[]
    correctOrder: number[]
  }
}

// Odd one out question
export interface OddOneQuestion extends QuestionBase {
  type: 'odd-one-out'
  data: {
    question: string
    options: string[]
    correctAnswer: number
  }
}

// Union type for all questions
export type Question =
  | ChooseQuestion
  | WhichQuestion
  | WhatQuestion
  | OddOneQuestion

// A test is just an array of questions
export type TestType = Question[]
