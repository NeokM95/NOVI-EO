import { useContext } from "react";

import { AuthorizationContext } from "../../context/AuthorizationContext";

function Login() {

    const { login, setStudent, setTeacher, setAdmin, madeChoice } = useContext( AuthorizationContext )

    return (
        <>
            <h1>Login page</h1>

            <div>
                Hoe wil je inloggen:
                <button onClick={setStudent}>Leerling</button>
                <button onClick={setTeacher}>Leraar</button>
                <button onClick={setAdmin}>Administrator</button>
            </div>

            {madeChoice && <button onClick={ login }>Login</button>}
        </>
    );
}

export default Login;