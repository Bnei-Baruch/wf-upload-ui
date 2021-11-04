import React, { Component, Fragment } from 'react';
import LoginPage from '../shared/LoginPage';
import {kc} from "../shared/UserManager";
import UploadApp from "./UploadApp";

class MainPage extends Component {

    state = {
        pass: false,
        user: null,
        roles: [],
    };

    checkPermission = (user) => {
        const trl_public = kc.hasRealmRole("wp_plugin_upload");
        if(trl_public) {
            this.setState({user, roles: user.roles});
        } else {
            alert("Access denied!");
            kc.logout();
        }
    };

    render() {

        const {user} = this.state;

        let login = <LoginPage user={user} checkPermission={this.checkPermission} />;
        let content = <UploadApp />;

        return (
            <Fragment>
                {user ? content : login}
            </Fragment>

        );
    }
}

export default MainPage;
