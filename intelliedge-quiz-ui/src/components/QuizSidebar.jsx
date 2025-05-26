const QuizSidebar = ({ progress, total, time, stats }) => (
  <aside className="sidebar">
    <h3>Progress</h3>
    <div className="progress-bar">
      <div style={{ width: `${(progress / total) * 100}%` }} className="filled" />
    </div>
    <div><strong>Timer:</strong> {time}</div>
    <div><strong>Answered:</strong> {stats.answered}</div>
    <div><strong>Correct:</strong> {stats.correct}</div>
    <div><strong>Incorrect:</strong> {stats.incorrect}</div>
    <div><strong>Unanswered:</strong> {stats.unanswered}</div>
  </aside>
);
export default QuizSidebar;
