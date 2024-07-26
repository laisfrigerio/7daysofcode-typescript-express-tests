import express from "express";
import quizRoutes from "./quiz/quiz.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/quizzes", quizRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
