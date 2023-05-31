import React from "react";

import loadingSrc from "../../../images/loading.gif";

const Preloader = ({ isFetching }) => {
    return (
        <>
            {isFetching &&
                <img className="loading" src={loadingSrc} />
            }
        </>
    )
}

export default Preloader;