import UnauthorizedSection from "./sections/unauthorized/UnauthorizedSection";
import AuthorizedSection from "./sections/authorized/AuthorizedSection";

import './App.css';

function App() {

    return (
        <>
            <UnauthorizedSection/>
            <AuthorizedSection/>
        </>
    );
}

export default App;
