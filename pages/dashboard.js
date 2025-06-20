import Dashboard from "@/components/Dashboard/dashboard";
import { useState } from "react";
import sha256 from 'crypto-js/sha256'
import styles from '../components/Dashboard/dashboard.module.css'

const token = '5eb1bb4d5ebd1578ed23535220158822321975646b3a37d5ee5ed3542887be33'

export default function Home() {
  const [auth, setAuth] = useState(false)
  const [err, setErr] = useState('')
  const [password, setPassword] = useState('')

  const authCheck = () => {
    if (sha256(password).toString() === token) {
      setAuth(true)
    } else {
      setErr("Wrong Password")
    }
  }

  if (!auth) {
    return (
      <form onSubmit={(e) => { e.preventDefault(); authCheck(); }} className={styles.loginContainer}>
        <h1>Login</h1>
        <input onChange={(e) => setPassword(e.target.value)} className={styles.input} placeholder='Token' type="password"/>
        <button type="submit" className={styles.button}>Submit</button>
        <h4>{err}</h4>
      </form>
    );
  }

  return <Dashboard />;
}
