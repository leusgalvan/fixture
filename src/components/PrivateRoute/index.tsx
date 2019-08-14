import React, { useContext } from "react";
import { FirebaseContext } from "../Firebase";
import { Route, Redirect } from "react-router-dom";
import { RouteComponentProps, RouteProps } from "react-router";

interface PrivateRouteProps extends RouteProps {
  [restProp: string]: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const firebase = useContext(FirebaseContext);

  if (!Component) return null;

  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps<any>) =>
        firebase.getCurrentUser() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
