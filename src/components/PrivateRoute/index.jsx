import React, { useContext } from "react";
import { FirebaseContext } from "../Firebase";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const firebase = useContext(FirebaseContext);

  return (
    <Route
      {...rest}
      render={props =>
        firebase.auth.currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
