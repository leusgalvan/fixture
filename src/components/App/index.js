import React from 'react';
import {withFirebase} from '../Firebase';
const App = () => {
    return (
        <div>Home</div>
    );
};

export default withFirebase(App);