import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./ListQuiz.scss";

const ListQuiz = (props) => {
  const [arrayQuiz, setArrayQuiz] = useState([]);
  const navigate = useNavigate();

  const { t } = useTranslation();

  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res && res.EC === 0) {
      setArrayQuiz(res.DT);
    }
  };

  useEffect(() => {
    getQuizData();
  }, []);

  return (
    <div className="list-quiz-container container">
      {arrayQuiz &&
        arrayQuiz.length > 0 &&
        arrayQuiz.map((quiz, index) => {
          return (
            <div
              key={`${index}-quiz`}
              className="card"
              style={{ width: "18rem" }}
            >
              <img
                className="card-img-top"
                src={
                  quiz.image
                    ? `data:image/jpeg;base64,${quiz.image}`
                    : "/default.jpg"
                }
                alt="Card"
              />
              <div className="card-body">
                <h5 className="card-title">
                  {t("listQuiz.title1")} {index + 1}
                </h5>
                <p className="card-text">{quiz.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/quiz/${quiz.id}`, {
                      state: { quizDescription: quiz.description },
                    })
                  }
                >
                  {t("listQuiz.btn1")}
                </button>
              </div>
            </div>
          );
        })}
      {arrayQuiz && arrayQuiz.length === 0 && <div>{t("listQuiz.text1")}</div>}
    </div>
  );
};
export default ListQuiz;
