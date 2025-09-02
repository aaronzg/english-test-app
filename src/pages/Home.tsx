import { Link } from 'react-router'
// This comment was made from my chromebook

export default function Home() {
  return (
    <>
      <header className='text-center py-4'>
        <h1>
          英語の<span className='text-blue-400'>テスト</span>
        </h1>
      </header>

      <main>
        <h2 className='text-center mt-3 mb-8'>Choose a test</h2>
        <div className='flex flex-col place-items-center space-y-8'>
          <Link to={'/test/1'} className='option_card'>
            Book 2 <br />
            (Examen anterior)
          </Link>

          <Link to={'/test/2'} className='option_card'>
            Book 3
          </Link>
        </div>
      </main>
    </>
  )
}
