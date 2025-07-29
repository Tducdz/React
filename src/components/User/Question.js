import { useState } from "react";
import _ from "lodash";
import Lightbox from "yet-another-react-lightbox";

const Question = (props) => {
  const { data, index } = props;

  const [open, setOpen] = useState(false);
  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleCheckbox = (event, answerId, questionId) => {
    props.handleCheckbox(answerId, questionId);
  };

  return (
    <>
      <div className="q-img">
        <img
          style={{ cursor: "pointer" }}
          onClick={() => setOpen(true)}
          src={`data:image/png;base64,${data.imageFile}`}
          alt=""
        />
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[
            {
              src: `data:image/png;base64,${data.imageFile}`,
              alt: "Question image",
            },
          ]}
        />
      </div>

      <div className="question">
        Question {index + 1}: {data.description}?
      </div>

      <div className="answer">
        {data.answers &&
          data.answers.length &&
          data.answers.map((a, index) => {
            return (
              <div key={a.id} className="option">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={a.isSelected}
                    onChange={(event) => handleCheckbox(event, a.id, data.id)}
                  />
                  <label className="form-check-label">{a.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
