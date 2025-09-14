import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router'
// This comment was made from my chromebook


export default function Home() {
  // Implement GSAP animations
  useGSAP(() => {
    gsap.fromTo('#home_title', {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      ease: 'back.out',
      yoyo: true,
      duration: 1
    })

    gsap.fromTo('#home_test_options', {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'bounce.out'
    })
  }, [])
  
  return (
    <div className='min-h-screen bg-gradient-to-br from-base-white via-stone-300 to-base-white dark:from-black dark:via-gray-950 dark:to-black'>
      <header className='text-center py-9'>
        <div
          id='home_title'
          className='bg-gradient-to-r text-transparent from-blue-600 via-indigo-600 to-purple-600 bg-clip-text'
        >
          <h1>
            英語の<span>テスト</span>
          </h1>
        </div>
      </header>

      <main className='container mx-auto'>
        <h2 className='text-center mt-3 mb-8 dark:text-stone-200'>
          Choose a test
        </h2>
        <div id='home_test_options' className='flex flex-col gap-6 mx-10 items-center'>
          <Link to={'/test/1'} className='option_card'>
            Book 2
          </Link>

          <Link to={'/test/2'} className='option_card'>
            Book 3
          </Link>
        </div>
      </main>
    </div>
  )
}
