import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export interface WithRouterProps {
    location: ReturnType<typeof useLocation>;
    params: Record<string, number>;
    navigate: ReturnType<typeof useNavigate>;
}

export function WithRouter<WCP extends object>(Component: React.ComponentType<WCP>) {
    const ComponentWithRouterProp: React.FC<WCP> = (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                location={location} navigate={navigate} params={params}
            />
        );
    }
    return ComponentWithRouterProp;
}