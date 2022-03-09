import { googleSignin, googleSignout } from "../Auth"

export function SignInButton() {
    return (
        <button className="login signin" onClick={googleSignin}>Sign In</button>
    )
}

export function SignOutButton() {
    return (
        <button className="login signout" onClick={ googleSignout }>Sign Out</button>
    )
}