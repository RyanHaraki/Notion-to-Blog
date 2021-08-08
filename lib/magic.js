import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";

// Create client-side Magic instance
const createMagic = (key) => {
  return (
    typeof window != "undefined" &&
    new Magic(key, {
      extensions: [new OAuthExtension()],
    })
  );
};

export const magic = createMagic("pk_live_5CCAE6F4A919F927");

// user?.issuer checks for a user
// user?.loading checks if user is loading
// const [user] = useContext(UserContext) USE THIS TO CHECK
// user?.loading ? "Loading" : user?.email || use email
