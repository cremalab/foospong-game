import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  opacity: 0.7;
`;

const IconArrow = props => (
  <Svg
    width="458"
    viewBox="0 0 458 288"
    preserveAspectRation
    height="288"
    {...props}
  >
    <g>
      <title>background</title>
      <g
        display="none"
        overflow="visible"
        y="0"
        x="0"
        height="100%"
        width="100%"
        id="canvasGrid"
      >
        <rect
          fill="url(#gridpattern)"
          strokeWidth="0"
          y="0"
          x="0"
          height="100%"
          width="100%"
        />
      </g>
    </g>
    <g>
      <title>Layer 1</title>
      <path
        id="svg_1"
        d="m5.09749,222.26064l223.5,-218.00001l223.5,218.00001l-447.00001,0z"
        strokeWidth="0"
        stroke="#000"
        fill="#306856"
      />
      <ellipse
        ry="27.5"
        rx="27.5"
        id="svg_2"
        cy="258"
        cx="227.5"
        strokeOpacity="null"
        strokeWidth="0"
        stroke="#000"
        fill="#306856"
      />
    </g>
  </Svg>
);

export default IconArrow;
