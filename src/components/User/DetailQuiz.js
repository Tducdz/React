/* eslint-disable jsx-a11y/alt-text */
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import "./DetailQuiz.scss";

const DetailQuiz = () => {
  const param = useParams();
  const quizId = param.id;
  const location = useLocation();

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  return (
    <div className="detail-quiz-container container">
      <div className="left-content">
        <div className="title">
          {" "}
          {`Quiz ${quizId}: `}
          {location?.state?.quizDescription}
        </div>
        <hr />
        <div className="q-body">
          <img />
        </div>
        <div className="q-content">
          <div className="question">question 1: what is your name?</div>
          <div className="answer">
            <div className="option">A. dap an 1</div>
            <div className="option">B. dap an 2</div>
            <div className="option">C. dap an 3</div>
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-secondary">Prev</button>
          <button className="btn btn-primary">Next</button>
        </div>
      </div>
      <div className="right-content">count down</div>
    </div>
  );
};

export default DetailQuiz;
