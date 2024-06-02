"use client"

const Profile = async({params}) => {
  const result=await getUserByEmail(params.email);

  return (
    <div>
      <h1>User Details</h1>
      <h2>Name : {result.name}</h2>
      <h2>Email : {result.email}</h2>
      <h2>Adhar : {result.adhar}</h2>
      <h2>Instructor : {result.instructor}</h2>
    </div>
  )
}

export default Profile