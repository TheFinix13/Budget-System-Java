import React, {useState} from "react";

// layout for page
import Auth from "layouts/Auth.js";

//services
import Link from "next/link";
import {AuthService} from "../../data/api";
import {useRouter} from "next/router";
import jwtDecode from 'jwt-decode';

export default function Login() {
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loginUser(e) {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsLoading(true);
    setError(null);

    loginData.email = loginData.email.toLowerCase().replace(/ /g, "");

    AuthService.login(loginData)
        .then(response => {
          const token = response.data;

          //save token to local storage
          window.localStorage
              .setItem("token", token);

          //decode token to get user data
          const decodedToken = jwtDecode(token);
          const userRole = decodedToken.role;
          const ministryId = decodedToken.ministryId;
          const sub = decodedToken.sub

          //redirect to dashboard
          if (userRole === "superAdmin") {
            router.push("/superAdmin");
          } else if (userRole === "admin") {
            router.replace(`/admin/[id]?id=${encodeURIComponent(sub)}`);
          } else if (userRole === "ministry") {
            router.replace(`/ministry/[id]?id=${encodeURIComponent(ministryId)}`);
          } else if (userRole === "approve") {
            router.push("/approver/dashboard");
          } else {
            console.log("User role not found")
            // router.push("/auth/login");
          }
        })
        .catch(error => {
          setError("Invalid email or password. Please try again.");
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

  return (
      <>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center w-1/2">
            <div className="w-full lg:w-full px-4">
              <div className="relative flex flex-col min-w-0 break-words w-10/12 mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-sm font-bold">
                      Sign in with
                    </h6>
                  </div>
                  <div className="btn-wrapper text-center">
                    <button
                        className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                        type="button"
                    >
                      <img alt="..." className="w-5 mr-1" src="/img/github.svg" />
                      Github
                    </button>
                    <button
                        className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                        type="button"
                    >
                      <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                      Google
                    </button>
                  </div>
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                  <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <small>Or sign in with credentials</small>
                  </div>

                  <form>
                    <div className="relative w-full mb-3">
                      <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                          type="email"
                          id="email"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Email"
                          value={loginData.email}
                          onChange={e =>
                              setLoginData({ ...loginData, email: e.target.value })
                          }
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                          type="password"
                          id="password"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                          value={loginData.password}
                          onChange={e =>
                              setLoginData({ ...loginData, password: e.target.value })
                          }
                      />
                    </div>

                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        />
                        <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                      </label>
                    </div>

                    {error && <p className="text-red-500 mt-2">{error}</p>}

                    <div className="text-center mt-6">
                      <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                          onClick={loginUser}
                          disabled={isLoading}
                      >
                        {isLoading ? "Signing In..." : "Sign In"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="flex flex-wrap mt-6 relative">
                <div className="w-1/2">
                  <a
                      onClick={e => e.preventDefault()}
                      className="text-blueGray-200"
                  >
                    <small>Forgot password?</small>
                  </a>
                </div>

                <div className="w-1/2 text-right">
                  <Link href="/auth/register">
                    <a className="text-blueGray-200">
                      <small>Create new account</small>
                    </a>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </>
  );
}

Login.layout = Auth;
