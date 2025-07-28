import { useEffect, useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "yet-another-react-lightbox";
import {
  getAllQuizForAdmin,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
} from "../../../../services/apiService";
import { toast } from "react-toastify";

const Questions = (props) => {
  const [open, setOpen] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const initQuestion = [
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
  ];

  const [questions, setQuestions] = useState(initQuestion);

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

  const handlePreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);

    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
      setOpen(true);
    }
  };

  const handleSubmitQuestionForQuiz = async () => {
    // Validate quiz
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz!");
      return;
    }

    // Validate question
    let isValid = true;
    let indexQ = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValid = false;
        indexQ = i;
        break;
      }
    }
    if (isValid === false) {
      toast.error(`Question ${indexQ + 1} is blank.`);
      return;
    }

    // Validate answer
    isValid = true;
    indexQ = 0;
    let indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValid = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (isValid === false) {
        toast.error(`Answer ${indexA + 1} in question ${indexQ + 1} is blank.`);
        break;
      }
    }

    // Submit Question
    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      // Submit Answer
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          answer.isCorrect,
          q.DT.id
        );
      }
    }

    if (isValid === true) {
      toast.success("Create questions and answers succed!");
      setQuestions(initQuestion);
    }
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
              options={listQuiz}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: "rgb(0, 191, 255)",
                  primary: "black",
                },
              })}
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
                        <div
                          className="form-floating mt-2"
                          style={{ position: "relative", zIndex: "0" }}
                        >
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
                          {question.imageName ? (
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => handlePreviewImage(question.id)}
                            >
                              {question.imageName}
                            </span>
                          ) : (
                            "No file chosen"
                          )}
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

                            <div
                              className="form-floating answer-name"
                              style={{ position: "relative", zIndex: "0" }}
                            >
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
            <Lightbox
              open={open}
              close={() => setOpen(false)}
              slides={[
                {
                  src: dataImagePreview.url,
                  alt: dataImagePreview.title,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
