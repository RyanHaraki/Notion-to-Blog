import React from "react";
import { magic } from "../../lib/magic";
import { UserContext } from "../../lib/UserContext";
import { useContext, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import Image from "next/image";
import Menu from "../../public/menu.png";
import Logo from "../../public/logo.svg";
import Profile from "../../public/profile.svg";

const Header = () => {
  const [user] = useContext(UserContext);
  // show navbar
  const [showing, setShowing] = useState(false);
  // show dropwdown
  const [showDropDown, setShowDropdown] = useState(false);

  // Show or hide navbar every time user clicks hamburger menu
  const toggleNavbar = (e) => {
    e.preventDefault();

    if (showing === false) {
      setShowing(true);
    } else {
      setShowing(false);
    }
  };

  const toggleDropdown = (e) => {
    e.preventDefault();

    if (showDropDown) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  };

  const logout = () => {
    magic.user.logout().then(() => {
      setUser({ user: null });
      Router.push("/login");
    });
  };

  return (
    <header className="flex flex-col md:flex-row items-center justify-between py-2 md:py-2 px-6 w-full shadow-md ">
      {/* Left */}
      <div className="md:flex ml-5">
        <Link href="/">
          <div className="items-center flex">
            <Image
              className="cursor-pointer mr-3 "
              src={Logo}
              alt="Logo"
              width={40}
              height={40}
            />
          </div>
        </Link>
      </div>
      {/* Right */}
      <div className="md:flex mr-5">
        <div
          className={
            showing
              ? " flex flex-col md:flex-row items-start md:items-center text-lg "
              : "hidden md:flex flex-col md:flex-row items-start md:items-center text-lg"
          }
        ></div>
        {/* check if user logged in or not and display accordingly */}
        {user?.issuer ? (
          <div className="flex">
            <div className="mx-1 cursor-pointer hover:bg-gray-100 flex items-center justify-center rounded-full ">
              <Image
                src={Profile}
                height={35}
                width={35}
                alt=""
                onClick={toggleDropdown}
                className={
                  user
                    ? "text-blue-500 rounded-full hover:bg-gray-100 cursor-pointer"
                    : "rounded-full hover:bg-gray-100"
                }
              />

              {showDropDown && (
                <div className="absolute mt-40 bg-white p-1 rounded-lg shadow-md">
                  <Link href={`/`}>
                    <p className="hover:bg-blue-500 hover:text-white transition p-2 rounded-lg">
                      Dashboard
                    </p>
                  </Link>
                  <Link href="/settings">
                    <p className="hover:bg-blue-500 hover:text-white transition p-2 rounded-lg">
                      Settings
                    </p>
                  </Link>
                  <p
                    onClick={logout}
                    className="hover:bg-blue-500 hover:text-white transition p-2 rounded-lg"
                  >
                    Log Out
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className={
              showing
                ? " flex flex-col md:flex-row items-start md:items-center text-lg"
                : "hidden md:flex flex-col md:flex-row items-start md:items-center text-lg"
            }
          >
            {" "}
            <Link href="/login">
              <button type="button" className="mx-3 hover:underline ">
                Log In
              </button>
            </Link>
            <Link href="/login">
              <button
                type="button"
                className="mx-2 my-1 font-medium bg-black text-white px-2 py-1.5 rounded-md"
              >
                Get Started
              </button>
            </Link>
          </div>
        )}
        <div
          onClick={toggleNavbar}
          className="bg-mint text-mint fill-current md:hidden absolute top-0 right-0 mr-3 mt-3 cursor-pointer"
        >
          <Image
            src={Menu}
            alt="Picture of the author"
            width="24"
            height="24"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
