
// get a new access token for a user to use for back end requests
const getFirebaseIdToken = async (user) => {
    try {
        return await user.getIdToken(true)
    } catch (err) {
        console.log(err)
        throw new Error("Token call failed.")
    }
}

export default getFirebaseIdToken