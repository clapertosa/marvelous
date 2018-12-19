import Head from "next/head";
import User from "../../hoc/User/User";
import redirect from "../../lib/redirect";
import checkLoggedIn from "../../lib/checkLoggedIn";
import AvatarForm from "../../components/Dashboard/Form/AvatarForm/AvatarForm";
import Form from "../../components/Dashboard/Form/Form";
import styles from "./index.scss";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <User>
        {({ data: { currentUser }, error, loading }) => (
          <div className={styles["grid-container"]}>
            <Head>
              <title>Marvelous 🚀 | {currentUser.name} Dashboard</title>
            </Head>
            <div className={styles["form-container"]}>
              <div className={styles["avatar"]}>
                <AvatarForm />
              </div>
              <div>
                <div className={styles["name"]}>
                  <Form name initialName={currentUser.name} />
                </div>
                <div className={styles["email"]}>
                  <Form email initialEmail={currentUser.email} />
                </div>
                <div className={styles["password"]}>
                  <Form password />
                </div>
              </div>
            </div>
          </div>
        )}
      </User>
    </div>
  );
};

Dashboard.getInitialProps = async context => {
  const { userLoggedIn } = await checkLoggedIn(context.apolloClient);

  if (!userLoggedIn.currentUser) {
    redirect(context, "/login");
  }

  return {};
};

export default Dashboard;
