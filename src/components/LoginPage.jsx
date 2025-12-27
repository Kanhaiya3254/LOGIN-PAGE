import { useState } from "react";
import "./LoginPage.css";

function LoginPage() {
  // ---------------------- LOGIN STATES ----------------------
  const [selectedTab, setSelectedTab] = useState("login");
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState(""); // ✅ ERROR STATE

  // ---------------------- REGISTER STATES ----------------------
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [registerError, setRegisterError] = useState(""); // ✅ ERROR STATE

  // ✅ LOADING STATE
  const [loading, setLoading] = useState(false);

  // 🔔 Forgot Password
  const handleForgotPassword = () => {
    alert("Password reset link has been sent to your email!");
  };

  // 🌐 Social Login Handlers
  const openFacebook = () => window.open("https://www.facebook.com/login/", "_blank");
  const openGoogle = () => window.open("https://www.google.com/", "_blank");
  const openTwitter = () => window.open("https://twitter.com/login", "_blank");
  const openGithub = () => window.open("https://github.com/login", "_blank");

  // ---------------------- ✅ LOGIN WITH ERROR + LOADING ----------------------
  const handleLogin = () => {
    setLoginError(""); // ✅ Clear old error

    if (!loginUser || !loginPass) {
      setLoginError("All login fields are required");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (loginPass.length < 6) {
        setLoginError("Password too short");
        setLoading(false);
        return;
      }

      alert("Login Successful ✅");

      setLoginUser("");
      setLoginPass("");
      setLoading(false);
    }, 1500);
  };

  // ---------------------- ✅ REGISTER WITH ERROR + LOADING ----------------------
  const handleRegister = () => {
    setRegisterError(""); // ✅ Clear old error

    if (!regName || !regEmail || !regUser || !regPass || !regConfirm) {
      setRegisterError("All fields are required");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(regEmail)) {
      setRegisterError("Invalid email address");
      return;
    }

    if (regPass.length < 6) {
      setRegisterError("Password too short (min 6 chars)");
      return;
    }

    if (regPass !== regConfirm) {
      setRegisterError("Passwords do not match");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      alert("Account Created Successfully ✅");

      setRegName("");
      setRegEmail("");
      setRegUser("");
      setRegPass("");
      setRegConfirm("");
      setSelectedTab("login");

      setLoading(false);
    }, 1500);
  };

  // ---------------------- RETURN JSX ----------------------
  return (
    <div className="login-container">

      {/* Tabs */}
      {selectedTab !== "forgot" && (
        <div className="tabs">
          <button
            className={selectedTab === "login" ? "active" : "inactive"}
            onClick={() => setSelectedTab("login")}
          >
            LOGIN
          </button>

          <button
            className={selectedTab === "register" ? "active" : "inactive"}
            onClick={() => setSelectedTab("register")}
          >
            REGISTER
          </button>
        </div>
      )}

      {/* Social Buttons */}
      {selectedTab !== "forgot" && (
        <>
          <p className="signin-text">
            {selectedTab === "login" ? "Sign in with:" : "Sign up with:"}
          </p>

          <div className="social-icons">
            <i className="fab fa-facebook-f" onClick={openFacebook}></i>
            <i className="fab fa-google" onClick={openGoogle}></i>
            <i className="fab fa-twitter" onClick={openTwitter}></i>
            <i className="fab fa-github" onClick={openGithub}></i>
          </div>

          <p className="or-text">or:</p>
        </>
      )}

      {/* ---------- LOGIN FORM ---------- */}
      {selectedTab === "login" && (
        <div className="form-box">

          {loginError && <p style={{ color: "red" }}>{loginError}</p>}

          <input
            type="text"
            placeholder="Email or username"
            className="input-box"
            value={loginUser}
            onChange={(e) => setLoginUser(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input-box"
            value={loginPass}
            onChange={(e) => setLoginPass(e.target.value)}
          />

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>

            <a href="#" onClick={() => setSelectedTab("forgot")}>
              Forgot password?
            </a>
          </div>

          <button className="sign-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Please wait..." : "SIGN IN"}
          </button>
        </div>
      )}

      {/* ---------- REGISTER FORM ---------- */}
      {selectedTab === "register" && (
        <div className="form-box">

          {registerError && <p style={{ color: "red" }}>{registerError}</p>}

          <input
            type="text"
            placeholder="Full Name"
            className="input-box"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            className="input-box"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Username"
            className="input-box"
            value={regUser}
            onChange={(e) => setRegUser(e.target.value)}
          />

          <input
            type="password"
            placeholder="Create Password"
            className="input-box"
            value={regPass}
            onChange={(e) => setRegPass(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="input-box"
            value={regConfirm}
            onChange={(e) => setRegConfirm(e.target.value)}
          />

          <button className="sign-btn" onClick={handleRegister} disabled={loading}>
            {loading ? "Creating..." : "CREATE ACCOUNT"}
          </button>
        </div>
      )}

      {/* ---------- FORGOT PASSWORD ---------- */}
      {selectedTab === "forgot" && (
        <div className="form-box">
          <h3>Reset Your Password</h3>

          <input type="email" placeholder="Enter your email" className="input-box" />

          <button className="sign-btn" onClick={handleForgotPassword}>
            Send Reset Link
          </button>

          <p className="register-text">
            <a href="#" onClick={() => setSelectedTab("login")}>Back to Login</a>
          </p>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
