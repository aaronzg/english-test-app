import type { QuestionErrors, TestType, UserAnswers } from "../types";

export const asignLetter = (i: number, option: string) => {
    const letters = ["a", "b", "c", "d"];
    const optionText = `${letters[i]}) ${option}`;

    return optionText;
};

export const flatCorrectAnswers = (test: TestType) => {
    const result: number[] = [];

    test.forEach((q) => {
        if (q.type === "choose" || q.type === "odd-one-out") {
            result.push(q.data.correctAnswer);
        } else if (q.type === "which-word") {
            q.data.lines.forEach((line) => result.push(...line.correctAnswers));
        } else if (q.type === "whats-the-word") {
            result.push(...q.data.correctOrder);
        }
    });

    return result.map((q) => q.toString());
};

export const flatAnswers = (test: TestType, userAnswers: UserAnswers) => {
    const result: string[] = [];

    test.forEach((q) => {
        const ans = userAnswers[q.id];
        if (!ans) return;

        if (Array.isArray(ans)) {
            result.push(...ans);
        } else {
            result.push(ans);
        }
    });

    return result;
};

export function buildAnswerMap(test: TestType) {
    let counter = 0;
    const map: QuestionErrors = {}; // { questionId: [globalIdx, globalIdx...] }

    test.forEach((q) => {
        if (q.type === "choose" || q.type === "odd-one-out") {
            map[q.id] = [counter++];
        } else if (q.type === "which-word") {
            map[q.id] = [];
            q.data.lines.forEach((line) => {
                line.correctAnswers.forEach(() => {
                    map[q.id].push(counter++);
                });
            });
        } else if (q.type === "whats-the-word") {
            map[q.id] = q.data.correctOrder.map(() => counter++);
        }
    });

    return map;
}

export const sliceTest = (test: TestType, questions: number, start: number) => {
    if (questions === 999) return [test];

    const tests = [];

    const length = Math.ceil(test.length / questions);

    let count = start === -1 ? 0 : start;

    for (let i = 0; i < length; i++) {
        tests.push(test.slice(count, count + questions));
        count += questions;
    }

    console.log(`Start index:${start}, Questions: ${questions}`)
    console.log(tests)
    return tests;
};
