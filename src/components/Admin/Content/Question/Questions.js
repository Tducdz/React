import { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };

      setQuestions([...questions, newQuestion]);
    }

    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);

    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };

      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }

    if (type === "REMOVE") {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionsClone);
    }
  };

  const handleOnchange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === questionId);

      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };

  const handleOnChangeFileQuestion = (questionId, event) => {
    const file = event.target.files[0];
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);

    if (index > -1 && file && file.type.startsWith("image/")) {
      questionsClone[index].imageFile = file;
      questionsClone[index].imageName = file.name;
      setQuestions(questionsClone);
    }
  };

  const handleAnswerQuestion = (type, questionId, answerId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);

    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );
      setQuestions(questionsClone);
    }
  };

  const handleSubmitQuestionForQuiz = () => {
    alert(questions);
  };

  return (
    <>
      <div className="questions-container">
        <div className="title">Manage Questions</div>
        <div className="add-new-question">
          <div className="col-6 form-group">
            <label>Select Quiz</label>
            <Select
              defaultValue={selectedQuiz}
              onChange={setSelectedQuiz}
              options={options}
            />
          </div>
          <div className="mt-3">
            Add Questions
            {questions &&
              questions.length > 0 &&
              questions.map((question, index) => {
                return (
                  <div key={question.id} className="question-main mb-4">
                    <div className="desc-file">
                      <div className="add-question">
                        <div className="form-floating mt-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="name@example.com"
                            value={question.description}
                            onChange={(event) =>
                              handleOnchange(
                                "QUESTION",
                                question.id,
                                event.target.value
                              )
                            }
                          />
                          <label>Question {index + 1} - Description</label>
                        </div>
                      </div>
                      <div className="upload-file">
                        <label
                          className="label-upload"
                          htmlFor={`${question.id}`}
                        >
                          Upload image
                        </label>
                        <input
                          type="file"
                          id={`${question.id}`}
                          hidden
                          onChange={(event) =>
                            handleOnChangeFileQuestion(question.id, event)
                          }
                        />
                        <span>
                          {question.imageName
                            ? question.imageName
                            : "No file choosen"}
                        </span>
                      </div>
                      <div className="answer-control">
                        <FaPlusCircle
                          className="icon-add"
                          onClick={() => handleAddRemoveQuestion("ADD")}
                        />
                        {questions.length > 1 && (
                          <FaMinusCircle
                            className="icon-remove"
                            onClick={() =>
                              handleAddRemoveQuestion("REMOVE", question.id)
                            }
                          />
                        )}
                      </div>
                    </div>
                    {question.answers &&
                      question.answers.length > 0 &&
                      question.answers.map((answer, index) => {
                        return (
                          <div key={answer.id} className="answer-content">
                            <input
                              className="form-check-input iscorrect"
                              type="checkbox"
                              checked={answer.isCorrect}
                              onChange={(event) =>
                                handleAnswerQuestion(
                                  "CHECKBOX",
                                  question.id,
                                  answer.id,
                                  event.target.checked
                                )
                              }
                            />
                            <div className="form-floating answer-name">
                              <input
                                value={answer.description}
                                type="text"
                                className="form-control"
                                placeholder="name@example.com"
                                onChange={(event) =>
                                  handleAnswerQuestion(
                                    "INPUT",
                                    question.id,
                                    answer.id,
                                    event.target.value
                                  )
                                }
                              />
                              <label>Answer {index + 1}</label>
                            </div>
                            <div className="answer-control">
                              <FaPlusCircle
                                className="icon-add"
                                onClick={() =>
                                  handleAddRemoveAnswer("ADD", question.id)
                                }
                              />
                              {question.answers.length > 1 && (
                                <FaMinusCircle
                                  className="icon-remove"
                                  onClick={() =>
                                    handleAddRemoveAnswer(
                                      "REMOVE",
                                      question.id,
                                      answer.id
                                    )
                                  }
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            {questions && questions.length > 0 && (
              <div>
                <button
                  className="btn btn-warning"
                  onClick={() => handleSubmitQuestionForQuiz()}
                >
                  Save Question
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
