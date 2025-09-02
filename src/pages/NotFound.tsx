import { Link } from "react-router"

export const NotFound = () => {
  return (
    <div className='text-center mt-5'>
      <h2>Test no encontrado</h2>
      <Link to={'/'} className='text-blue-200 underline md:hover:underline'>
        Volver a la pagina principal
      </Link>
    </div>
  )
}
