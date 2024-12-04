import React, { useEffect, useState } from "react";
import * as bootstrap from "bootstrap";
import { useAuthContext } from "../context/AuthContext";

const SignInModal = () => {
  const { signInModal, setSignInModal, registerOpened, setRegisterOpened } =
    useAuthContext();
  useEffect(() => {
    setSignInModal(new bootstrap.Modal(document.getElementById("signInModal")));
  }, []);

  return (
    <div
      className="modal fade"
      id="signInModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="signInModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark rounded-4">
          <div className="modal-body">
            <div className="row">
              <div className="col-12 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="col-12 d-flex justify-content-center">
                <div className="d-inline-flex gap-2 modal-bg-1 py-2 px-2 rounded-5">
                  <button
                    onClick={() => setRegisterOpened(false)}
                    className={`btn text-white ${
                      !registerOpened && "btn-light bg-theme border-0"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setRegisterOpened(true)}
                    className={`btn text-white ${
                      registerOpened && "btn-light bg-theme border-0"
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>

              <hr className="border-1 border-white mt-3" />

              <div className="col-12">
                {!registerOpened ? (
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="" className="form-label text-white">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white h-45"
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="col-12 mt-2">
                      <label htmlFor="" className="form-label text-white">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control bg-dark text-white h-45"
                        placeholder="Enter password"
                      />
                    </div>
                    <div className="col-12 mt-3">
                      <a href="" className="link-1">
                        Forgot password
                      </a>
                    </div>
                    <div className="col-12 mt-4 mb-2 d-inline-flex justify-content-between">
                      <button className="btn btn-light" data-bs-dismiss="modal">
                        Close
                      </button>
                      <button className="btn btn-light bg-theme border-0 text-white">
                        Sign in
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="" className="form-label text-white">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white h-45"
                        placeholder="Enter name"
                      />
                    </div>
                    <div className="col-12 mt-2">
                      <label htmlFor="" className="form-label text-white">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white h-45"
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="col-12 mt-2">
                      <label htmlFor="" className="form-label text-white">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control bg-dark text-white h-45"
                        placeholder="Enter password"
                      />
                    </div>
                    <div className="col-12 mt-2">
                      <label htmlFor="" className="form-label text-white">
                        Retype password
                      </label>
                      <input
                        type="password"
                        className="form-control bg-dark text-white h-45"
                        placeholder="Retype password"
                      />
                    </div>
                    <div className="col-12 mt-4 mb-2 d-inline-flex justify-content-between">
                      <button className="btn btn-light" data-bs-dismiss="modal">
                        Close
                      </button>
                      <button className="btn btn-light bg-theme border-0 text-white">
                        Register
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
