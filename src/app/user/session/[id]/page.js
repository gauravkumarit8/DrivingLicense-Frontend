import { userSession } from '@/utils/userApi/page';
import styles from '../Session.module.css'

const Session = async ({ params }) => {
  const result = await userSession(params.id);
  console.log(result);

  const data = result.data.instructor || {};

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Sessions</h1>
      {data.name ? (
        <>
          <h3 className={styles.instructorDetail}>Instructor's Name: <span>{data.name}</span></h3>
          <h3 className={styles.instructorDetail}>Instructor's Email: <span>{data.email}</span></h3>
          <h3 className={styles.instructorDetail}>Instructor's Phone no: <span>{data.phone}</span></h3>
        </>
      ) : (
        <p className={styles.noInstructor}>No instructor assigned or data unavailable.</p>
      )}
    </div>
  );
};

export default Session;
