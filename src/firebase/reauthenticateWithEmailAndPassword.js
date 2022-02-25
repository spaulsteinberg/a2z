import { getAuth, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"

// reauthenticate with an email/password credential.
const reauthenticateWithEmailAndPassword = (email, password) => {
    const auth = getAuth()
    const credential = EmailAuthProvider.credential(email, password)
    return new Promise((resolve, reject) => {
        reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
            resolve("true")
        })
        .catch(err => {
            reject("Call to authenticate user failed.")
        })
    })
}

export default reauthenticateWithEmailAndPassword
