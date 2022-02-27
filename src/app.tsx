import {
  Button,
  Card,
  Loader,
  InputField,
  TextArea,
  TextAreaField,
} from "@livechat/design-system";
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
      <div className="p-8">
        <h1 className="text-header-xl mb-10">MQTT Connection Details</h1>

        <div className="mb-10 w-3/5">
          <InputField
            readonly
            labelText="Connect URL"
            description="Use the above URI for mqtt libraries that support it"
            value="wss://loremipsum.com"
          />
        </div>

        <details className="mb-10">
          <summary className="cursor-pointer mb-4">Advanced</summary>
          <div className="mb-4 w-3/5">
            <InputField
              readonly
              labelText="Broker address"
              description="Note: The broker uses v3, websocket mqtt protocol, listening on port 1883"
              value="loremipsum.com"
            />
          </div>
          <div className="mb-4 w-3/5">
            <InputField readonly labelText="Username" value="288309" />
          </div>
          <div className="mb-4 w-3/5">
            <InputField
              readonly
              labelText="Password"
              value="ds6g8fg83fa37af37gfa7fg8af6g8a6gaf86783aw78dv87687a3=="
            />
          </div>
        </details>

        <h2 className="text-header-md mb-6">Examples</h2>

        <TextAreaField
          readonly
          labelText="Using HiveMQ client"
          value="mqtt sub..."
          fieldClassName="font-monospace w-3/5"
        />
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
