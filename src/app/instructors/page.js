import Link from "next/link";
import styles from "./Instructoe.module.css";

const Instructor = () => {
  return (
    <div className={styles.container}>
      <video autoPlay loop muted className={styles.video}>
        <source src="/car.mp4" type="video/mp4" />
      </video>
      <div className={styles.overlay}>
        <header className={styles.header}>
          <h1>Welcome to Our Application</h1>
          <p>Discover the features and join our community.</p>
        </header>
        <main className={styles.main}>
          <section className={styles.infoSection}>
            <h2>Instructor HomePage </h2>
            <p>
              Our application offers a variety of features to help you manage
              your tasks efficiently and effectively. Whether you're a student,
              a professional, or just someone looking to organize their life,
              our app has something for you.
            </p>
          </section>
          <div className="p-2 m-2">
            <Link href="/instructors/login">
              <button className="px-4 py-2 m-4 text-white bg-blue-500 rounded">
                Login
              </button>
            </Link>
            <Link href="/instructors/register">
              <button className="px-4 py-2 m-4 text-white bg-red-500 rounded">
                Register
              </button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Instructor;
