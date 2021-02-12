import { FC, useEffect, useState, useCallback } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { auth } from "../utils/firebase";
import { AuthContext } from "../auth/Auth";
import { TextInput, ComponentButton } from "../component";
import styles from "../../styles/Home.module.css";

const SignIn: FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push("/");
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.push("/");
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.medium} />
      <h1 className={styles.headline}>サインイン</h1>
      <div className={styles.medium} />
      <TextInput
        fullWidth={true}
        label={"メールアドレス"}
        type={"e-mail"}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={"パスワード"}
        type={"password"}
        onChange={inputPassword}
      />
      <div className={styles.medium} />
      <div className={styles.center}>
        <ComponentButton onClick={signIn} label={"サインイン"} />
      </div>
      <div className={styles.medium} />
      <div className={styles.text_center}>
        <Link href="/signup">
          <a>アカウントをお持ちでない方はこちら</a>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
