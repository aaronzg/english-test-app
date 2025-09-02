import { Toast as ToastFR } from 'flowbite-react'
import { useEffect, useState } from 'react'
type ToastProps = {
  children?: React.ReactNode
  closeText?: string
  buttons?: React.ReactElement[]
  visible: boolean
  onClose: () => void
}
export const Toast = ({
  children,
  closeText = 'Cerrar',
  buttons = [],
  visible,
  onClose
}: ToastProps) => {
  const [showToast, setShowToast] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const closeToast = () => {
    setIsVisible(false) // animación de salida
    setTimeout(() => setShowToast(false), 300) // desmontar tras la duración de la animación
  }

  const openToast = () => {
    setShowToast(true) // montar
    setTimeout(() => setIsVisible(true), 10) // esperar 1 tick y lanzar animación de entrada
  }


  const handleClose = () => {
    closeToast()
    onClose()
  }

  useEffect(() => {
    if(visible) {
      openToast()
    } 
  }, [visible])

  return (
    <div>
      {showToast && (
        <ToastFR
          className={`fixed bottom-10 right-5 md:right-10 transition-all ${
            isVisible
              ? 'opacity-100 translate-x-0'
              : 'translate-x-100 opacity-0'
          }`}
        >
          {children}
          <div className='ml-auto flex items-center space-x-2'>
            {buttons.length > 0 && buttons.map((el) => el)}
            <button
              onClick={handleClose}
              className='rounded-lg p-1.5 text-sm font-medium text-primary-600 hover:bg-primary-100 dark:text-primary-500 dark:hover:bg-gray-700'
            >
              {closeText}
            </button>
          </div>
        </ToastFR>
      )}
    </div>
  )
}
