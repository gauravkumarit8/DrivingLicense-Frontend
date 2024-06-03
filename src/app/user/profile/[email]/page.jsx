import { getUserByEmail } from "@/utils/userApi/page"
import Link from "next/link";

const Profile = async({params}) => {
  const result=await getUserByEmail(params.email);
  // console.log(result.data.name);
  return (
    <div>
      <h1>User Details</h1>
      <h2>Name : {result.data.name}</h2>
      <h2>Email : {result.data.email}</h2>
      <h2>Adhar Number : {result.data.adhar}</h2>
      <h2>Role : {result.data.role}</h2>
      <h2>Status : {result.data.status}</h2>
      <h2>Instructor : {result.data.instructor}</h2>
      <h4>Get user sessions :- <Link href={`/user/session/${result.data.id}`}>My Sessions</Link></h4>
    </div>
  )
}

export default Profile