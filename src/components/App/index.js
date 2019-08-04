import React, { useState, useContext, useEffect } from 'react';
import { LinearProgress } from '@material-ui/core';
import { FirebaseContext } from '../Firebase';
import Home from '../Home';

const App = () => {
    const firebase = useContext(FirebaseContext);
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        firebase.onInitialize(setInitialized);
    }, [firebase]);
    return initialized? <Home />: <LinearProgress />;
};

export default App;