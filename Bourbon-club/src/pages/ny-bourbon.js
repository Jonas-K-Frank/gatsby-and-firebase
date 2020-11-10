import React, {useState, useContext} from 'react'
import {Form, Input, Button} from "../components/common"
import {FirebaseContext} from "../components/firebase"

const NyBourbon = () => {
    const {firebase} = useContext(FirebaseContext);
    const [bourbonName, setBourbonName] = useState('');
    const [success, setSuccess] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        firebase.createBourbon({
            bourbonName
        }).then(() => {
            setBourbonName('');
            setSuccess(true);
        })
    }

    return (
    <Form onSubmit={handleSubmit}>
        <Input onChange={(e) => {
            e.persist();
            setSuccess(false);
            setBourbonName(e.target.value);
        }} value={bourbonName} placeholder="Navnet på den bourbon du vil tilføje" />
        {!!success &&
            <span>
                Bourbon er tilføjet
            </span>
        }
        <Button type="submit" block>
            Tilføj bourbon
        </Button>
    </Form>
    );
}

export default NyBourbon;