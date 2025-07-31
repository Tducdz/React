import "./DashBoard.scss";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { getOverview } from "../../../services/apiService";
import { useEffect, useState } from "react";

const DashBoard = (props) => {
  const [dataOverview, setDataOverview] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  const fetchDataOverview = async () => {
    let res = await getOverview();
    if (res && res.EC === 0) {
      setDataOverview(res.DT);

      let Qz = 0,
        Qs = 0,
        As = 0;

      Qz = res?.DT?.others?.countQuiz ?? 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;
      As = res?.DT?.others?.countAnswers ?? 0;

      const data = [
        { name: "Quizzes", value: Qz, color: "#84d892ff" },
        { name: "Questions", value: Qs, color: "#84bbd8ff" },
        { name: "Answers", value: As, color: "#bd84d8ff" },
      ];

      setDataChart(data);
    }
  };

  useEffect(() => {
    fetchDataOverview();
  }, []);

  return (
    <div className="dashboaed-container">
      <div className="title">Analytics DashBoard</div>
      <div className="content">
        <div className="content-left">
          <div className="child">
            <span className="text-1">Total Users</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.users &&
              dataOverview.users.total ? (
                <>{dataOverview.users.total}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Quizzes</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuiz ? (
                <>{dataOverview.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Questions</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuestions ? (
                <>{dataOverview.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Answers</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countAnswers ? (
                <>{dataOverview.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className="content-right">
          <ResponsiveContainer width={"95%"} height={"100%"}>
            <BarChart data={dataChart}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" barSize={80}>
                {dataChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
