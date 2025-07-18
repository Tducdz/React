import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";

const DetailQuiz = () => {
  const param = useParams();
  const quizId = param.id;

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    console.log(res);
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  console.log(param);
  return <div className="detail-quiz-container">detailquiz</div>;
};

export default DetailQuiz;
