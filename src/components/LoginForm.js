import { useState } from "react";
import FirebaseAuthService from "../FirebaseAuthService";

function LoginForm({ existingUser }){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    async function handleSumbit(event){
        event.preventDefault();
        try{
            await FirebaseAuthService.loginUser(userName, password);
            setUserName('');
            setPassword('');
        } catch (err) {
            alert(err.message);
        }
    }

    function handleLogout() {
        FirebaseAuthService.logoutUser();
    }

    async function handleSendResetPasswordEmail(){
        if(!userName){
            alert('Missing User Name');
            return
        }  
        try{
            await FirebaseAuthService.sendPasswordResetEmail(userName);
            alert("sent the password reset email");
        } catch (err) {
            alert(err.message)
        }

    }

    async function handelLoginWithGoogle(){
        try{
            await FirebaseAuthService.loginWithGoogle();
        } catch (err) {
            alert(err.message)
        }
    }

    return <div className="login-form-container">
        {
            existingUser ? (<div className="row">
                <h3>Welcome, {existingUser.email}</h3>
                <button type="button" className="primary-button" onClick={handleLogout}>Logout</button>
            </div>) : (<form onSubmit={handleSumbit} className="login-form">
                <label className="input-label login-label">
                    Username (email):
                    <input 
                        type="email" 
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="input-text"
                    />
                </label>
                <label className="input-label login-label">
                    password:
                    <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-text"
                    />
                </label>
                <div className="button-box">
                    <button className="primary-button">Login</button>
                    <button 
                        type="button"
                        onClick={handleSendResetPasswordEmail}
                        className="primary-button"
                    >
                        Reset Password
                    </button>
                    <button 
                        type="button"
                        onClick={handelLoginWithGoogle}
                        className="primary-button"
                    >
                        LogIn with Google
                    </button>
                </div>
            </form>)
        }
    </div>
}

export default LoginForm