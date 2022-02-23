import { Button, Card, Loader } from "@livechat/design-system";
import { useCallback, useLayoutEffect, useState } from "preact/hooks";

import { authorize } from "./services";

interface CredentialsPayload {
  username: number;
  password: string;
}

export function App() {
  const [isLoading, setLoading] = useState(true);
  const [isLogged, setLogged] = useState(false);
  const [credentials, setCredentials] = useState<CredentialsPayload>();

  const handleLogin = useCallback(() => {
    return authorize().then((authorizeData) => {
      setCredentials(authorizeData);
      setLogged(true);
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
        <h2>You are logged in</h2>
        <Card style={{ width: "400px" }}>
          <div className="grid grid-col-2" style={{ "grid-gap": "20px 0" }}>
            <div className="bold">Username</div>
            <div>{credentials?.username}</div>

            <div className="bold">Password</div>
            <div className="text-break">{credentials?.password}</div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <Card style={{ width: "400px" }} title="Login via LiveChat">
        <h2>Login</h2>
        <Button kind="primary" onClick={handleLogin}>
          Login
        </Button>
      </Card>
    </div>
  );
}
