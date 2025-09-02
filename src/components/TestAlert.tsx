import { Alert, Button } from 'flowbite-react'
import { useRef, useEffect, useState } from 'react'
import { Toast } from './Toast'

export const TestAlert = () => {
  const [show, setShow] = useState(true)
  const [toastShow, setToastShow] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setShow(true)
    }, 1000 * 60 * 5);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const closeToast = () => {
    setToastShow(false)
  }

  const handleClick = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setShow(false)
  }

  return (
    <>
      <Alert
        onDismiss={() => setShow(false)}
        className={`fixed bottom-5 left-5 md:bottom-10 md:left-10 transition-all 
          ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-30'}`}
      >
        <span className='font-medium'>Consejo importante! </span> Evita recargar
        la pagina o tu progreso va a valer mierda.
        <Button
          color='dark'
          className='mt-2'
          onClick={handleClick}
        >
          Ya no me avises wey
        </Button>
    
      </Alert>

      <Toast visible={toastShow} onClose={closeToast}>
          Si encuentras algun error enviame una captura 🫡
      </Toast>
    </>
  )
}
