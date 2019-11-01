import {useEffect, useRef} from 'react'

export default function useIsMounted(){
  const ref = useRef(true)

  useEffect(()=>{
    ref.current = true

    return ()=>ref.current = false
  }, [])

  return ref.current
}
