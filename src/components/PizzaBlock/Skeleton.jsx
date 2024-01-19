import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="137" cy="110" r="100" />  
    <rect x="0" y="234" rx="11" ry="11" width="280" height="25" /> 
    <rect x="0" y="279" rx="10" ry="10" width="280" height="88" /> 
    <rect x="2" y="390" rx="10" ry="10" width="95" height="30" /> 
    <rect x="127" y="390" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton;