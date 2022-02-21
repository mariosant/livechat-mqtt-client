import { AuthorizedPayload } from "@livechat/accounts-sdk";
import { Button, Card, Loader } from "@livechat/design-system";
import { useCallback, useLayoutEffect, useState } from "preact/hooks";

import { instance } from "./services";

export function App() {
  const [isLoading, setLoading] = useState(true);
  const [isLogged, setLogged] = useState(false);
  const [authUser, setAuthUser] = useState<AuthorizedPayload>();

  const handleLogin = useCallback(() => {
    return instance
      .popup()
      .authorize()
      .then((authorizeData) => {
        const transactionData = instance.verify(authorizeData);

        if (transactionData) {
          // const data = await getToken(authorizeData, transactionData);

          setAuthUser(authorizeData);
          setLogged(true);
        } else {
          // nothing
        }
      });
  }, []);

  useLayoutEffect(() => {
    handleLogin().finally(() => {
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <Loader size="large" />
      </div>
    );
  }

  if (isLogged) {
    return (
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <h2>Hello user</h2>
        <span>Your are logged in.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <Card style={{ width: "300px" }} title="Login via LiveChat">
        <h2>Login</h2>
        <Button kind="primary" onClick={handleLogin}>
          Login
        </Button>
      </Card>
    </div>
  );
}
