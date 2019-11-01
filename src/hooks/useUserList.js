import { useState } from 'react'
import axios from 'axios'

import useRepeated from './useRepeated'

export default function useLocationList(timeout = 60 * 1000){
  const [userList, setUserList] = useState(null)

  useRepeated(async callback=>{
    axios.get('/api/users')
      .then(({data})=>{setUserList(data)})
      .finally(callback)
  }, [], timeout)

  return userList
}
