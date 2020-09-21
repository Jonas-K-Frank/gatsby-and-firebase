import React, {useState, useContext} from "react"
import {FirebaseContext} from '../components/firebase'
import {Form, Input, Button, ErrorMessage} from '../components/common';


const Login = () => {

    const [formValues, setFormValues] = useState({email: '', password: ''});
    const {firebase} = useContext(FirebaseContext);
    const [errorMessage, setErrorMessage] = useState('');


    function handleSubmit (event){
        event.preventDefault();

        firebase.login({email: formValues.email, password: formValues.password}).catch(error => {
            console.log(error);
            setErrorMessage(error.message);
        });
    }

    function handleInputChange(event) {
        event.persist();
        setErrorMessage('');
        setFormValues(currentValues => ({
            ...currentValues,
            [event.target.name]: event.target.value
        }))
    }
    return (
  <section>
      <Form onSubmit={handleSubmit}>
          <Input required value={formValues.email} name="email" onChange={handleInputChange}placeholder="email" type="email" />
          <Input required value={formValues.password} name="password" onChange={handleInputChange} placeholder="password" type="password" />
          {!!errorMessage &&
            <ErrorMessage>
                Email eller password passer ikke med dit login
            </ErrorMessage>
          }
          <Button type="submit" block>
              Login
          </Button>
      </Form>
  </section>
)
}

export default Login