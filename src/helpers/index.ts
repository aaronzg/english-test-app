import type { QuestionErrors, TestType, UserAnswers } from '../types'

export const asignLetter = (i: number) => {
  const letters = ['a', 'b', 'c', 'd']
  const optionText = letters[i].toUpperCase()

  return optionText
}

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// It returns a flat array of the correct answers
export const flatCorrectAnswers = (test: TestType) => {
  // I used an array of numbers for the answers since it's easier to compare them
  const result: number[] = []

  // Put the correct options of each question on the result array
  test.forEach((q) => {
    if (q.type === 'choose' || q.type === 'odd-one-out') {
      result.push(q.data.correctAnswer)
    } else if (q.type === 'which-word') {
      q.data.lines.forEach((line) => result.push(...line.correctAnswers))
    } else if (q.type === 'whats-the-word') {
      result.push(...q.data.correctOrder)
    }
  })

  // Returns the array in string to avoid converting the input of the user to number each time we want to compare
  return result.map((q) => q.toString())
}

// It returns a flat array with the user's answers
export const flatAnswers = (test: TestType, userAnswers: UserAnswers) => {
  const result: string[] = []

  test.forEach((q) => {
    const ans = userAnswers[q.id]
    if (!ans) return

    if (Array.isArray(ans)) {
      result.push(...ans)
    } else {
      result.push(ans)
    }
  })

  return result
}

// It returns a Map of each questions with its global index
/*
 * This is because the questions which word & what's the word can have multiple answers
 * in the same question, so the easiest way to compare the correct aswers is having a
 * flat array.
 *
 * So from this way we can now the exact blank where the user went wrong.
 *
 */
export function buildAnswerMap(test: TestType) {
  let counter = 0 // Global counter of blanks/white spaces
  const map: QuestionErrors = {} // { questionId: [globalIdx, globalIdx...] }

  test.forEach((q) => {
    if (q.type === 'choose' || q.type === 'odd-one-out') {
      map[q.id] = [counter++]
    } else if (q.type === 'which-word') {
      map[q.id] = []
      q.data.lines.forEach((line) => {
        line.correctAnswers.forEach(() => {
          map[q.id].push(counter++)
        })
      })
    } else if (q.type === 'whats-the-word') {
      map[q.id] = q.data.correctOrder.map(() => counter++)
    }
  })

  return map
}

// Slices the test into sections of a certain ammount of questions
// Returns of Tests with the slices
export const sliceTest = (test: TestType, questions: number, start: number) => {
  if (questions === 999) return [test]

  const tests = []

  const length = Math.ceil(test.slice(start).length / questions)

  let count = start === -1 ? 0 : start

  for (let i = 0; i < length; i++) {
    tests.push(test.slice(count, count + questions))
    count += questions
  }

  return tests
}

export const calculateUserScore = (test: TestType, answers: UserAnswers) => {
  const correctAnswers = flatCorrectAnswers(test)
  const userAnswers = flatAnswers(test, answers)

  const score = userAnswers.reduce(
    (counter, ans, i) => (ans === correctAnswers[i] ? counter + 1 : counter),
    0
  )

  const result = {
      percentage: (score * 100) / correctAnswers.length,
      string: `${score} / ${correctAnswers.length}`,
  }

  return result
}

export const getUserErrors = (test: TestType, answers: UserAnswers) => {
  const correctAnswers = flatCorrectAnswers(test)
  const userAnswers = flatAnswers(test, answers)

  const answerMap = buildAnswerMap(test)

  const errors: QuestionErrors = {}

  Object.entries(answerMap).forEach(([qId, index]) => {
    const qIdNum = Number(qId)

    errors[qIdNum] = []

    index.forEach((globalIdx, localIdx) => {
      if (userAnswers[globalIdx] !== correctAnswers[globalIdx]) {
        errors[qIdNum].push(localIdx)
      }
    })
  })

  return errors
}
