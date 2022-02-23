import AccountsSDK, { AuthorizedPayload } from "@livechat/accounts-sdk";

export const instance = new AccountsSDK({
  client_id: import.meta.env.VITE_CLIENT_ID as string,
  redirect_uri: import.meta.env.VITE_REDIRECT_URL as string,
});

export const authenticate = (): Promise<AuthorizedPayload> => {
  return instance
    .popup()
    .authorize()
    .then((authorizeData) => {
      const transactionData = instance.verify(authorizeData);

      if (!transactionData) {
        throw new Error("Bad credentials");
      }

      return authorizeData;
    });
};

export const authorize = () => {
  return authenticate().then((data) => getUser(data.access_token));
};

export const getUser = (token: string) => {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/me`, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const getToken = (authorizeData: any, transactionData: any) => {
  return fetch(`${instance.options.server_url}/v2/token`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      grant_type: "authorization_code",
      code: authorizeData.code,
      client_id: transactionData.client_id,
      redirect_uri: transactionData.redirect_uri,
      code_verifier: transactionData.code_verifier,
    }),
  });
};
