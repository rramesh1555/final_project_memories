import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../services/login";
import { loginAction } from "../../store/reducers/loginReducer";
import { useDataStore } from "../../store/storeContext";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import "./ui.css";
import Register from "../Register";





const LoginForm = () => {

  const [state, dispatch] = useDataStore();

  const [ isRegister, setRegister ] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const onSubmit = async (data) => {

    if (Object.entries(errors).length === 0) {

      try {
        const { username, password } = data;
        const formSubmit = await loginUser(username, password);

        if (formSubmit) {
          const { token, user } = formSubmit.data
          dispatch({
            type: loginAction.SET_TOKEN,
            payload: { token, name: user.name, avatar: user.avatar }
          });

        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <>
  { !isRegister ? 
    <>
    <div className="container-fluid">
        <div className="row no-gutter">
          <div className="col-md-6 d-none d-md-flex bg-image"></div>

          <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-5">

              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <h3 className="display-4"><a href="/"><img src="../images/logo.png" alt="Logo" /></a></h3>
                    <p className="text-muted mb-4"><em>"We capture your memories forever....!!!"</em></p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group mb-3">
                        <input id="inputEmail" type="email" placeholder="Email address" required="" autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4" {...register('username', { required: true })} />
                        {errors.username && <span className="error">Username is required.</span>}
                      </div>
                      <div className="form-group mb-3">
                        <input id="inputPassword" type="password" placeholder="Password" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" {...register('password', { required: true })} />
                        {errors.password && <span className="error">Password is required.</span>}
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Remember password" />
                      </div>

                      <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm" style={{ width: 330 }}>Sign in</button>


                      <div className="text-center d-flex justify-content-between mt-4"><p><a onClick={() => setRegister(true)} className="font-italic text-muted" style={{ marginLeft: 80 }}>
                          <u>Create a new account</u></a></p></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </> : 
    <>
        <Register></Register>
    </>}
      

  </>
        );
}

export default LoginForm
