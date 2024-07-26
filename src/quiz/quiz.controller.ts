// The controller layer is responsible for handling the incoming HTTP requests and sending back the appropriate responses.
// In this exercice:
//   - The getQuizzesController function returns the list of quizzes
//   - The createQuizController function creates a new quiz from trivia API.
// The controller functions are called by the routes layer when a request is made to the corresponding endpoint.
import { Request, Response } from "express";
import {
  getQuizzesService,
  getQuizByIdService,
  getQuestionsByCategoryService,
  createQuizService,
  warmUpQuizService,
  updateQuizQuestionService,
  updateQuizBulkService,
  deleteQuestionFromQuizService,
  deleteQuizService,
} from "./quiz.service";
import { NotFoundException } from "./quiz.exception";
import { IQuestion, IQuiz } from "./quiz.model";

export const getQuizzesController = (_req: Request, res: Response) => {
  res.json(getQuizzesService());
};

/*
 * This function is responsible for creating a new quiz from the trivia API.
 */
export const warmUpQuizController = async (_req: Request, res: Response) => {
  try {
    await warmUpQuizService();
    res.status(201).json({ message: "Quiz from trivia created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create quiz" });
  }
};

/*
 * This function is responsible for creating a new quiz from user input.
 * @param req: Request object
 * - req.body: Question[] - The list of questions to create the quiz
 */
export const createQuizController = async (req: Request, res: Response) => {
  try {
    const questions: IQuestion[] = req.body;
    await createQuizService(questions);
    res.status(201).json({ message: "Quiz created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create quiz" });
  }
};

/*
 * This function is responsible for getting a quiz by its ID.
 * @param req: Request object
 * - req.params.quizId: number - The ID of the quiz
 */
export const getQuizByIdController = (req: Request, res: Response) => {
  try {
    const quizId = parseInt(req.params.quizId);
    const quiz: IQuiz = getQuizByIdService(quizId);
    res.json(quiz);
  } catch (error: any) {
    if (error instanceof NotFoundException) {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: "Unexpected internal server error" });
  }
};

/*
 * This function is responsible for getting the questions of a quiz by its category.
 * @param req: Request object
 * - req.params.category: string - The category of the quiz
 */
export const getQuestionsByCategoryController = (
  req: Request,
  res: Response
) => {
  try {
    const category = req.params.category;
    const questions: IQuestion[] = getQuestionsByCategoryService(category);
    res.json(questions);
  } catch (error: any) {
    if (error instanceof NotFoundException) {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: "Unexpected internal server error" });
  }
};

/*
 * This function is responsible for updating a question of a quiz.
 * @param req: Request object
 * - req.params.quizId: number - The ID of the quiz
 * - req.params.questionId: number - The ID of the question
 * - req.body: Question - The question that will replace the existing one
 */
export const updateQuizQuestionController = (req: Request, res: Response) => {
  try {
    const quizId = parseInt(req.params.quizId);
    const questionId = parseInt(req.params.questionId);
    const questionUpdate = req.body;
    updateQuizQuestionService(quizId, questionId, questionUpdate);
    res.json({ message: "Question updated successfully" });
  } catch (error: any) {
    if (error instanceof NotFoundException) {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: "Unexpected internal server error" });
  }
};

/*
 * This function is responsible for updating multiple questions of a quiz.
 * @param req: Request object
 * - req.params.quizId: number - The ID of the quiz
 * - req.body: Question[] - The list of questions that will replace the existing ones
 */
export const updateQuizBulkController = (req: Request, res: Response) => {
  try {
    const quizId = parseInt(req.params.quizId);
    const questionsUpdate = req.body;
    updateQuizBulkService(quizId, questionsUpdate);
    res.json({ message: "Questions updated successfully" });
  } catch (error) {
    if (error instanceof NotFoundException) {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: "Unexpected internal server error" });
  }
};

/*
 * This function is responsible for deleting a quiz.
 * @param req: Request object
 * - req.params.quizId: number - The ID of the quiz
 */
export const deleteQuizController = (req: Request, res: Response) => {
  try {
    const quizId = parseInt(req.params.quizId);
    deleteQuizService(quizId);
    res.json({ message: "Quiz deleted successfully" });
  } catch (error: any) {
    if (error instanceof NotFoundException) {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: "Unexpected internal server error" });
  }
};

/*
 * This function is responsible for deleting a question from a quiz.
 * @param req: Request object
 * - req.params.quizId: number - The ID of the quiz
 * - req.params.questionId: number - The ID of the question
 */
export const deleteQuestionFromQuizController = (
  req: Request,
  res: Response
) => {
  try {
    const quizId = parseInt(req.params.quizId);
    const questionId = parseInt(req.params.questionId);

    deleteQuestionFromQuizService(quizId, questionId);
    res.json({ message: "Question deleted successfully" });
  } catch (error: any) {
    if (error instanceof NotFoundException) {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: "Unexpected internal server error" });
  }
};
