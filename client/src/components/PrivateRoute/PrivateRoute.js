import { Redirect } from "react-router";
const PrivateRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={innerProps =>
        localStorage.getItem("email") ? (
          <Component {...innerProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  )
    };
export default PrivateRoute