import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function useGo() {
  const navigate = useNavigate()

  return {
    navigate
  }
}