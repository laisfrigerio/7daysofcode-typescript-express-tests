import axios from "axios";
import { IQuestion } from "../quiz/quiz.model";
import { triviaToInternal } from "../quiz/quiz.adapter";

export interface QuestionTrivia {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export const fetchQuestions = async (): Promise<IQuestion[]> => {
  try {
    const response = await axios.get("https://opentdb.com/api.php?amount=10");
    const questionsFromTrivia: QuestionTrivia[] = response.data.results;
    const questions: IQuestion[] = questionsFromTrivia.map((question, index) =>
      triviaToInternal(question, index)
    );
    return questions;
  } catch (error) {
    throw new Error("Failed to fetch questions from Trivia API");
  }
};
