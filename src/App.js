import { useContext, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import { AppContext } from "./context/AppProvider";
import Admin from "./layouts/Admin";
import { ToastContainer, toast } from "react-toastify";
import { Login } from "./layouts/Login";
import { CardBody, Spinner } from "reactstrap";
function App() {
    const { isLogin, user, setUser } = useContext(AppContext);
    let history = useHistory();
    useEffect(() => {
        if (localStorage.getItem("user")) {
            const user = JSON.parse(localStorage.getItem("user"));
            setUser(user);
        } else {
            history.push("/login");
        }
    }, [history, isLogin, setUser]);

    return (
        <Switch>
            <Route path="/login" render={(props) => <Login />} />
            <Route path="/" render={(props) => <Admin {...props} />} />
            <Redirect from="*" to="/" />
        </Switch>
    );
}

export default App;
