import React from 'react'
import { useAuthContext } from '../context/AuthContext'

const Homepage = () => {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <div>Homepage</div>
  )
}

export default Homepage