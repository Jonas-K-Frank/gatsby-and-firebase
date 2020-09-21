import React, {useState, useContext} from "react"
import {FirebaseContext} from '../components/firebase'
import {Form} from '../components/common/Form';
import {Input} from '../components/common/Input';
import {Button} from '../components/common/Button';

const Login = () => {

    const [formValues, setFormValues] = useState({email: '', password: ''});
    const {firebase} = useContext(FirebaseContext);

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
  <section>
      <Form onSubmit={handleSubmit}>
          <Input value={formValues.email} name="email" onChange={handleInputChange}placeholder="email" type="email" />
          <Input value={formValues.password} name="password" onChange={handleInputChange} placeholder="password" type="password" />
          <Button type="submit" block>
              Login
          </Button>
      </Form>
  </section>
)
}

export default Login