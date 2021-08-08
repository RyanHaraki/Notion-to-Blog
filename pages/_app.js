import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { UserContext } from "../lib/UserContext";
import { magic } from "../lib/magic";
import "@magiclabs/ui/dist/cjs/index.css";
import { ThemeProvider } from "@magiclabs/ui";
import Router from "next/router";
function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();

  // If isLoggedIn is true, set the UserContext with user data
  // Otherwise, redirect to /login and set UserContext to { user: null }
  useEffect(() => {
    setUser({ loading: true });
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        magic.user.getMetadata().then((userData) => setUser(userData));
      } else {
        Router.push("/login");
        setUser({ user: null });
      }
    });
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
