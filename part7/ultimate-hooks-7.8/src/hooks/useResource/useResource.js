/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  
  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }
  
  const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

  const create = async (resource) => {
    const config = {
        headers: { Authorization: token },
      }
    
      const response = await axios.post(baseUrl, resource, config)
      setResources(resources.concat(response.data));
      return response.data
  }

  const update = async (id, resource) => {
    const response = await axios.put(`${ baseUrl }/${id}`, resource)
    return response.data
  }

  useEffect(() => {
    getAll().then(response => {
        setResources(response);
    });
  }, [baseUrl])

  const service = {
    create,
    update,
    getAll,
    setToken,
  }

  return [
    resources, service
  ]
}

export default useResource;