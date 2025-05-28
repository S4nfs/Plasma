import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer className='fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 z-50'>
    <div className='max-w-7xl mx-auto px-4 py-3'>
      <div className='flex flex-col sm:flex-row justify-between items-center gap-2'>
        <span className='text-gray-300 text-sm'>
          &copy; {new Date().getFullYear()} Plasma AI Powered by{' '}
          <Link to='https://byolacademy.com' className='text-amber-600 hover:text-amber-500'>
            BYOL
          </Link>
        </span>
        <div className='flex gap-6'>
          <a href='#' className='text-gray-300 text-sm hover:text-amber-600 transition-colors'>
            Privacy Policy
          </a>
          <a href='#' className='text-gray-300 text-sm hover:text-amber-600 transition-colors'>
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
