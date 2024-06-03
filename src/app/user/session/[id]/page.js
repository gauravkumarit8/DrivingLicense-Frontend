import { userSession } from '@/utils/userApi/page'

const Session = async({params}) => {
    const result=await userSession(params.id);
    console.log(result);
    const data=result.data.instructor;
    console.log(data);
  return (
    <div>
        <h1>Sessions</h1>
        <h3>Instructor's Name :- {data.name}</h3>
        <h3>Instructor's Email :- {data.email}</h3>
        <h3>Instructor's Phone no :- {data.phone}</h3>
    </div>
  )
}

export default Session