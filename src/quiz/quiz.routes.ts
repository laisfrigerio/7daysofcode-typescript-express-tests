// Note: This file contains the routes for the quiz module
import { Router } from "express";
import {
  getQuizzesController,
  getQuizByIdController,
  getQuestionsByCategoryController,
  createQuizController,
  warmUpQuizController,
  updateQuizQuestionController,
  updateQuizBulkController,
  deleteQuestionFromQuizController,
  deleteQuizController,
} from "./quiz.controller";

const router = Router();

router.get("/", getQuizzesController);
router.get("/:quizId", getQuizByIdController);
router.get("/category/:category", getQuestionsByCategoryController);

router.post("/", createQuizController);
router.post("/warm-up", warmUpQuizController);

router.patch("/:quizId/question/:questionId", updateQuizQuestionController);
router.patch("/:quizId/bulk", updateQuizBulkController);

router.delete(
  "/:quizId/question/:questionId",
  deleteQuestionFromQuizController
);
router.delete("/:quizId", deleteQuizController);

export default router;
