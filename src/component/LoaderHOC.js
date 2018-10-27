import React, { Component } from "react";
import "../component/Loader.css";

const LoaderHOC = loading => WrappedComponent => {
  return class Loader extends Component {
    render() {
      if (this.props.loading) {
        return <div className="lds-dual-ring" />;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default LoaderHOC;
