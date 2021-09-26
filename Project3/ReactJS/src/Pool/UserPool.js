import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_C6a8ZHwbh",
    ClientId: "3c94lo00p1oir1u3h378ssioc1",
  };

export default new CognitoUserPool(poolData);