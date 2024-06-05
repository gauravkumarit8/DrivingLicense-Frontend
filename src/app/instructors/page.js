import Link from 'next/link'
import React from 'react'

const Instructor = () => {
  return (
    <div>
      <h3>Instructor</h3>
      <Link href="/instructors/login">Login</Link>
    </div>
  )
}

export default Instructor