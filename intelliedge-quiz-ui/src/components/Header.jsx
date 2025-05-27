import React from 'react'
import { Link } from 'react-router-dom'
import { PiFlaskDuotone as Flask } from 'react-icons/pi'

const Header = () => {
  return (
    <header className='relative bg-gradient-to-br from-slate-100 via-sla-200 to-blue-200 text-white py-4 px-6 shadow-lg top-0 z-50 overflow-hidden'>
      {/* Sky blue accent in bottom corner */}
      <div className='absolute bottom-0 right-0 w-40 h-40 bg-sky-400/20 rounded-full blur-2xl -mr-20 -mb-20'></div>

      <div className='relative flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <Link to='/' className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-500 hover:to-white transition-colors'>
            Plasma AI
          </Link>
          <div className='flex items-center bg-indigo-500/20 px-2 py-0.5 rounded-full border border-indigo-600/30'>
            <span className='text-xs font-medium text-sky-100 shadow-xl'>Beta</span>
            <Flask className='h-3.5 w-3.5 text-indigo-400 ml-1 transform -rotate-12' />
          </div>
        </div>

        <nav className='flex items-center'>
          <Link
            to='https://github.com/BYOL-Academy/Plasma'
            className='text-xs text-slate-400 hover:text-cyan-600 transition-colors flex items-center gap-1 px-3 py-1 rounded-full hover:bg-white/10'
          >
            v.1.6.0
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
