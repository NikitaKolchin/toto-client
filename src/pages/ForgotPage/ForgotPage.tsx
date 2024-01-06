import { useState, useEffect } from "react";
import UserService from "../../services/UserService";

const ForgotPage = () => {
  const [email, setEmail] = useState("");
  const [mailSended, setMailSended] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");

  useEffect(() => {
    const getCode = async () => {
      const resp = await UserService.sendCode(email);
      setMessage(resp.message);
    };
    if (mailSended) {
      getCode();
    }
  }, [mailSended, email]);

  useEffect(() => {
    const changeUserPassword = async () => {
      const resp = await UserService.changePasswordAlien(email, password, confirmationCode);
      setMessage(resp.message);
    };
    if (changePassword) {
      changeUserPassword();
    }
  }, [changePassword, confirmationCode, email, password]);

  return (
    <>
      <h1>change password</h1>
      {!mailSended && (
        <div>
          <input
            type="text"
            disabled={mailSended}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <button onClick={() => setMailSended(true)}>SendEmail</button>
        </div>
      )}
      {mailSended && (
        <>
          <div>
            <input
              type="password"
              disabled={changePassword}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <input
              type="password"
              disabled={changePassword}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            />
            <input
              type="text"
              disabled={changePassword}
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.currentTarget.value)}
            />
          </div>
          <div>{message}</div>
        </>
      )}
      {message && (
        <button disabled={changePassword} onClick={() => setChangePassword(true)}>
          Change password
        </button>
      )}
    </>
  );
};

export default ForgotPage;
