import React, {useState, useContext} from 'react';
import {Form, Input, Button, ErrorMessage} from '../components/common';
import {FirebaseContext} from '../components/firebase';


const Register = () => {
    const {firebase} = useContext(FirebaseContext);
    const [errorMessage, setErrorMessage] = useState('');

    const [formValues, setFormValues] = useState({
        email: '', 
        password: '',
        confirmPassword: '',
        username: ''
    });

     function handleInputChange(event) {
         event.persist();
         setErrorMessage('');
         setFormValues(currentValues => ({
             ...currentValues,
             [event.target.name]: event.target.value
         }))
     }   

    function handleSubmit(event) {
        event.preventDefault();

        if(formValues.password === formValues.confirmPassword) {
            firebase.register({
                username: formValues.username,
                email: formValues.email,
                password: formValues.password
            }).catch(error => {
                setErrorMessage(error.message);
            })
        }else {
            setErrorMessage('Password og bekræft password matcher ikke')
        }
    }
    return(
        <Form onSubmit={handleSubmit}>
            <Input onChange={handleInputChange} value={formValues.username} placeholder= "Brugernavn" type="text" required name="username" />
            <Input onChange={handleInputChange} value={formValues.email} placeholder= "Email" type="email" required name="email" />
            <Input onChange={handleInputChange} value={formValues.password} placeholder= "Password" type="password" minLength={4} required name="password"/>
            <Input onChange={handleInputChange} value={formValues.confirmPassword} placeholder= "Bekræft password" type="password" minLength={4} required name="confirmPassword"/>
            {!!errorMessage &&
            <ErrorMessage>
                {errorMessage}
            </ErrorMessage>
          }
            <Button type="submit" block>
                Registrer
            </Button>
        </Form>
    )
}

export default Register;