import { PiTimerDuotone } from 'react-icons/pi'
import { PiCheckCircleDuotone, PiXCircleDuotone, PiQuestionDuotone, PiCheckSquareOffsetDuotone } from 'react-icons/pi'

const QuizSidebar = ({ progress, total, time, stats, timeColor }) => (
  <aside className='sidebar '>
    <h2 className='text-slate-700'>Stats</h2>
    <div className='progress-bar flex flex-row'>
      <div style={{ width: `${(progress / total) * 100}%` }} className='filled' />
    </div>
    <div className='flex items-center gap-2 text-slate-400'>
      <PiTimerDuotone className='text-blue-500 text-xl' />
      <strong className='text-sm'>Timer:</strong>
      <div style={{ color: timeColor }}>{time}</div>
    </div>
    <div className='flex items-center gap-2 text-slate-400'>
      <PiCheckSquareOffsetDuotone className='text-purple-500 text-xl' />
      <strong className='text-sm'>Answered:</strong> {stats.answered}
    </div>
    <div className='flex items-center gap-2 text-slate-400'>
      <PiCheckCircleDuotone className='text-green-500 text-xl' />
      <strong className='text-sm'>Correct:</strong> {stats.correct}
    </div>
    <div className='flex items-center gap-2 text-slate-400'>
      <PiXCircleDuotone className='text-red-500 text-xl' />
      <strong className='text-sm'>Incorrect:</strong> {stats.incorrect}
    </div>
    <div className='flex items-center gap-2 text-slate-400'>
      <PiQuestionDuotone className='text-gray-500 text-xl' />
      <strong className='text-sm'>Unanswered:</strong> {stats.unanswered}
    </div>
  </aside>
)
export default QuizSidebar
