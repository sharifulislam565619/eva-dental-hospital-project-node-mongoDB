import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Redirect, Route, useLocation } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    useLocation()
    const { user, isLoading } = useAuth()
    if (isLoading) {
        return <Spinner animation="grow" variant="danger" />
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user?.email || user?.displayName ? (
                    children
                ) : (
                    <Redirect
                        to={{

                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;