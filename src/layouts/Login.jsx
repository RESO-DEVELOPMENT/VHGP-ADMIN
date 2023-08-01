import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Spinner } from "reactstrap";
import "./style.css";

import { AppContext } from "../context/AppProvider";
import { notify } from "../components/Toast/ToastCustom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  const { setUser } = useContext(AppContext);
  const inputs = document.querySelectorAll(".input");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      history.push("/");
    }

    return () => {};
  }, [history]);

  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
      parent.classList.remove("focus");
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
  });

  const hanldeLogin = () => {
    setIsLoading(true);
    // console.log(email, password);
    const authentication = getAuth();

    signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        console.log(response);
        if (response) {
          setIsLoading(false);
          notify("Đăng Nhập Thành Công", "Success");
          history.push("/");

          localStorage.setItem(
            "user",
            JSON.stringify({ user: response.user.email })
          );
        } else {
          notify("Sai tài khoản hoặc mật khẩu", "Error");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        notify("Sai tài khoản hoặc mật khẩu", "Error");
      });
  };
  return (
    <div>
      <img class="wave" src="images/wave.png" alt="" />
      <div class="container">
        <div class="img">
          <img src="images/bg.svg" />
        </div>
        <div class="login-content">
          <form action="index.html" className="form-login">
            <img src="images/avatar.svg" alt="" />
            <h2 class="login-title">
              Chào mừng bạn đến với VHGP - Tiện ích cư dân
            </h2>

            <div class="input-div one">
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <h5>Tên Đăng Nhập</h5>
                <input
                  type="text"
                  class="input"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </div>
            </div>
            <div class="input-div pass">
              <div class="i">
                <i class="fas fa-lock"></i>
              </div>
              <div class="div">
                <h5>Mật Khẩu</h5>
                <input
                  type="password"
                  class="input"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
              </div>
            </div>
            <button
              type="submit"
              class="btn-login"
              value="Đăng Nhập"
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                hanldeLogin();
              }}
            >
              {isLoading ? (
                <Spinner style={{ color: "rgb(100,100,100)" }}>
                  Loading...
                </Spinner>
              ) : (
                "Đăng Nhập"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
