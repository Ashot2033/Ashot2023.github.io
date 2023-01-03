import { useEffect, useState } from "react"

const useFetch = async (path) => {
  const [data, setData] = useState()

  useEffect(()=>{
    fetch(path)
      .then(res => { return res.json() })
      .then(data => setData(data))
  }, [path])

  return data
}
 
export default useFetch