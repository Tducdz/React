import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import "./ListQuiz.scss";

const ListQuiz = (props) => {
  const [arrayQuiz, setArrayQuiz] = useState([]);

  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res && res.EC === 0) {
      console.log(res);
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
                // src={quiz.image ? `data:image/jpeg;base64,${quiz.image}`: "/default.jpg"}
                src={`data:image/jpeg;base64,${quiz.image}`}
                alt="Card"
              />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{quiz.description}</p>
                <button className="btn btn-primary">Start Now</button>
              </div>
            </div>
          );
        })}
      {arrayQuiz && arrayQuiz.length === 0 && (
        <div>You don't have any quiz now...</div>
      )}
    </div>
  );
};
export default ListQuiz;
