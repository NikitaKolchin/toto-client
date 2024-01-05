import { FC, useEffect, useState } from "react";
import { User } from "../../../models/User";
import UserService from "../../../services/UserService";

const ConfirmEmail: FC<User> = (user) => {
  const [mailSended, setMailSended] = useState(false);
  const [activate, setActivate] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmationCode, setConfirmationCode] = useState(0);

  useEffect(() => {
    const getCode = async () => {
      try {
        const resp = await UserService.sendCode(user.id);
        setMessage(resp.data.message);
      } catch (e) {
        console.log(e);
      }
    };
    if (mailSended) {
      getCode();
    }
  }, [mailSended, user.id]);

  useEffect(() => {
    const activate = async () => {
      try {
        const resp = await UserService.activate(user.id, confirmationCode);
        setMessage(resp.data.message);
      } catch (e) {
        console.log(e);
      }
    };
    if (activate) {
      activate();
    }
  }, [activate, user.id]);
  console.log("confirmationCode", confirmationCode);

  return (
    <>
      {!mailSended &&<button onClick={() => setMailSended(true)}>ConfirmEmail</button>}
      {mailSended && (
        <>
          <div>
            <input
              type="number"
              value={confirmationCode}
              onChange={(e) =>
                setConfirmationCode(Number(e.currentTarget.value))
              }
            />
          </div>
          <div>{message}</div>
        </>
      )}
      {message &&<button onClick={() => setActivate(true)}>Activate</button>}
    </>
  );
};

export default ConfirmEmail;
