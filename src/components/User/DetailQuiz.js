import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import "./DetailQuiz.scss";
import Question from "./Question";
import _ from "lodash";

const DetailQuiz = () => {
  const param = useParams();
  const quizId = param.id;
  const location = useLocation();

  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    if (res?.DT?.qa) {
      const dataWithSelected = res.DT.qa.map((question) => ({
        ...question,
        answers: question.answers.map((ans) => ({
          ...ans,
          isSelected: false,
        })),
      }));

      setDataQuiz(dataWithSelected);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const handlePrev = () => {
    if (index - 1 >= 0) {
      setIndex(index - 1);
    }
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) {
      setIndex(index + 1);
    }
  };

  const handleCheckbox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz); // Không được thao tác trực tiếp với state nên clone ra
    let question = dataQuizClone.find((item) => +item.id === +questionId);
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }
    console.log(question);
    let index = dataQuizClone.findIndex((item) => +item.id === +questionId);
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };

  return (
    <div className="detail-quiz-container container">
      <div className="left-content">
        <div className="title">
          {" "}
          {`Quiz ${quizId}: `}
          {location?.state?.quizDescription}
        </div>
        <hr />
        {/* <div className="q-body">
          <img />
        </div> */}
        <div className="q-content">
          <Question
            index={index}
            handleCheckbox={handleCheckbox}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>

        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-primary" onClick={() => handleNext()}>
            Next
          </button>
          <button className="btn btn-warning" onClick={() => handleNext()}>
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">count down</div>
    </div>
  );
};

export default DetailQuiz;
