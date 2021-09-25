import React from "react";
import ContentLoader from "react-content-loader";

const TableContentLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={"100%"}
    height={30}

    backgroundColor="#52C0F7"
    foregroundColor="#001529"
    {...props}
  >
    <rect x="2%" y="10" rx="2" ry="2" width="16%" height="4" /> 
    <rect x="2%" y="20" rx="2" ry="2" width="16%" height="4" /> 
    <rect x="20%" y="10" rx="2" ry="2" width="18%" height="4" /> 
    <rect x="20%" y="20" rx="2" ry="2" width="18%" height="4" /> 
    <rect x="40%" y="10" rx="2" ry="2" width="18%" height="4" /> 
    <rect x="40%" y="20" rx="2" ry="2" width="18%" height="4" /> 
    <rect x="60%" y="10" rx="2" ry="2" width="18%" height="4" /> 
    <rect x="60%" y="20" rx="2" ry="2" width="18%" height="4" /> 
    <rect x="80%" y="10" rx="2" ry="2" width="18%" height="4" /> 
    <rect x="80%" y="20" rx="2" ry="2" width="18%" height="4" />
  </ContentLoader>
)

export default TableContentLoader;