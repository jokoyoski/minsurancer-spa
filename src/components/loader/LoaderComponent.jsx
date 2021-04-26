import React from 'react'
import Loader from "react-loader-spinner";
export const LoaderComponent = () => {
    return (
        <div>
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        visible={true}
      />
    </div>
    )
}

