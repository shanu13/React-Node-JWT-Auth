import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Link, withRouter} from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import classnames from 'classnames'

function Register(props) {
    const [state,setState] = useState({
        name:"",
        email:"",
        password:"",
        password2:"",
        rollNo:"",
        errors:{}
    })
    console.log('props',props.registerUser)
    console.log('props',props.auth)
    console.log('props',props.errors)

    useEffect(() => {
      console.log(props)
     if(props.errors){
       setState({
         ...state, errors: props.errors
       })
     }
    }, [ props ])

    const onChange = (e)=>{
        setState(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }
    const onSubmit = (e) => {
        e.preventDefault();
    const newUser = {
          name : state.name,
          email: state.email,
          password: state.password,
          password2 : state.password2,
          rollNo : state.rollNo

        };
        console.log(props.registerUser)
    console.log(state);
    console.log(newUser);
    props.registerUser(newUser,props.history)
      };
    const { errors } = state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name,
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email,
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={state.rollNo}
                  error={errors.rollNo}
                  id="rollNo"
                  type="number"
                  className={classnames("", {
                    invalid: errors.rollNo,
                  })}
                />
                <label htmlFor="rollNo">Roll Number</label>
                <span className="red-text">{errors.rollNo}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password,
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2,
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
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
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

const mapStateToProps = (state) =>  {
  console.log('state',state)
return ({
  auth: state.auth,
  errors: state.errors,
});
}
const mapDispatchToProps = dispatch => {
  return {
    registerUser : (data,history) => dispatch(registerUser(data,history))
    // registerUser : registerUser
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};



export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  (withRouter(Register))
)(Register)
