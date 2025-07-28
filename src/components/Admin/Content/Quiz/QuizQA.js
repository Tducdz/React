import { useEffect, useState } from "react";
import Select from "react-select";
import "./QuizQA.scss";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "yet-another-react-lightbox";
import {
  getAllQuizForAdmin,
  getQuizWithQA,
  postUpsertQA,
} from "../../../../services/apiService";
import { toast } from "react-toastify";

const QuizQA = (props) => {
  const [open, setOpen] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  function urltoFile(url, filename, mimeType) {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }

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

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && res.EC === 0) {
      // convert base64 to file object
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question-${q.id}`;
          q.imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `Question-${q.id}`,
            `image/png`
          );
        }
        newQA.push(q);
      }

      setQuestions(newQA);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);

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
    let questionsClone = _.cloneDeep(questions);
    for (let i = 0; i < questionsClone.length; i++) {
      if (questionsClone[i].imageFile) {
        questionsClone[i].imageFile = await toBase64(
          questionsClone[i].imageFile
        );
      }
    }

    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: questionsClone,
    });

    console.log(res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchQuizWithQA();
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  return (
    <>
      <div className="questions-container">
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

export default QuizQA;
