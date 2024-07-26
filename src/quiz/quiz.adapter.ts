// The adapter layer is responsible for Implementing the adapter to convert the trivia question to the internal model
import { QuestionTrivia } from "../third-party/trivia";
import { IQuestion } from "./quiz.model";

export const triviaToInternal = (
  questionTrivia: QuestionTrivia,
  index: number
): IQuestion => {
  const {
    category,
    type,
    difficulty,
    question,
    correct_answer,
    incorrect_answers,
  } = questionTrivia;
  return {
    id: index,
    category,
    type,
    difficulty,
    question: question,
    correctAnswer: correct_answer,
    incorrectAnswers: incorrect_answers,
  };
};
