import { useState, useEffect, useContext } from "react";
import { magic } from "../lib/magic";
import { UserContext } from "../lib/UserContext";
import Router from "next/router";
import Layout from "../components/layouts/Layout";

const Login = () => {
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  // Redirec to /profile if the user is logged in
  useEffect(() => {
    user?.issuer && Router.push("/");
  }, [user]);

  async function handleLoginWithEmail(email) {
    try {
      setDisabled(true); // disable login button to prevent multiple emails from being triggered

      // Trigger Magic link to be sent to user
      let didToken = await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL("/callback", window.location.origin).href, // optional redirect back to your app after magic link is clicked
      });

      // Validate didToken with server
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + didToken,
        },
      });

      if (res.status === 200) {
        // Set the UserContext to the now logged in user
        let userMetadata = await magic.user.getMetadata();
        await setUser(userMetadata);
        Router.push("/");
      }
    } catch (error) {
      setDisabled(false); // re-enable login button - user may have requested to edit their email
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginWithEmail(email);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Layout page="Login | Ultra">
      <div className="bg-secondary h-screen w-screen flex items-center justify-center">
        <form
          className="bg-white flex items-center justify-center flex-col py-4 px-8 rounded-md shadow-md w-5/6 md:w-3/6"
          onSubmit={handleSubmit}
        >
          <h1 className=" m-auto text-2xl my-2 font-bold ">Welcome</h1>
          <p className="color-gray-200 mb-6">
            Enter your email to create your account or login
          </p>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            className="my-2 p-2 border-2 border-gray-200 rounded-xl w-full"
            placeholder="Email"
          />
          <button
            onClick={handleSubmit}
            className="my-2 p-2 rounded-md bg-black text-white w-full"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
