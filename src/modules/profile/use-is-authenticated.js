import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function useIsAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined)
  const { profile } = useSelector(state => state);
  const profileStatus = profile && profile.status

  useEffect(() => {
    if (profile && profile.status) {
      if (profile.status === 'Logged in') {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    }
  }, [profile, profileStatus])

  return isAuthenticated
}