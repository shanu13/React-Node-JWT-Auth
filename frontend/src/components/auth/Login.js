import React, { useEffect, useState } from 'react'
import {withRouter} from 'react-router'
import { Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";


function Login(props){
    const [state,setState] = useState({
        rollNo:"",
        password:"",
        errors:{}
    })

    useEffect(()=>{
      console.log(props)
          if (props.auth.isAuthenticated) {
             props.history.push("/dashboard"); // push user to dashboard when they login
            }
        if (props.errors) {
           setState({
           ...state, errors: props.errors
          });
    }
  },[props])
    console.log('props',props)
    console.log('props',state.errors)

    const onChange = (e)=>{
        setState(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }
    const onSubmit = (e) => {
        e.preventDefault();
    const userData = {
          rollNo: state.rollNo,
          password: state.password
        };
    console.log(state);
    console.log(userData);
    props.loginUser(userData)
      };
    const { errors } = state;
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={state.rollNo}
                  error={errors.rollNo}
                  id="rollNo"
                  type="number"
                  className={classnames("", {
                    invalid: errors.rollNo || errors.RollNOnotfound,
                  })}
                />
                <label htmlFor="rollNo">Roll Number</label>
                <span className="red-text">
                  {errors.rollNo}
                  {/* {errors.numberNot} */}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect,
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>

              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (data) => loginUser(data)(dispatch),
    // registerUser : registerUser
  };
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  (withRouter(Login))
)(Login)

