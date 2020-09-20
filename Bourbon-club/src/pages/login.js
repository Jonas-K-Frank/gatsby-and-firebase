import React, {useState} from "react"
import { Link } from "gatsby"
import {useAuth} from '../components/firebase'

import Layout from "../components/layout"
//import SEO from "../components/seo"

const Login = () => {

    const [formValues, setFormValues] = useState({email: '', password: ''});
    const {firebase} = useAuth();

    function handleSubmit (event){
        event.preventDefault();

        firebase.login({email: formValues.email, password: formValues.password});
    }

    function handleInputChange(event) {
        event.persist();
        setFormValues(currentValues => ({
            ...currentValues,
            [event.target.name]: event.target.value
        }))
    }
    return (
  <Layout>
      <form onSubmit={handleSubmit}>
          <input value={formValues.email} name="email" onChange={handleInputChange}placeholder="email" type="email" />
          <input value={formValues.password} name="password" onChange={handleInputChange} placeholder="password" type="password" />
          <button type="submit">
              Login
          </button>
      </form>
  </Layout>
)
}

export default Login