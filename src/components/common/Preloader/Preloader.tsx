import React from "react";

import loadingSrc from "../../../images/loading.gif";

type propsType = { isFetching: boolean }

const Preloader: React.FC<propsType> = ({ isFetching }) => {
    return (
        <>
            {isFetching &&
                <img className="loading" src={loadingSrc} />
            }
        </>
    )
}

export default Preloader;