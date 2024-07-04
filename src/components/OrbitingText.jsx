import React from 'react';
import './OrbitingText.css';

const OrbitingText = ({color}) => {
  return (
    <div id="container"  className='' >
      <div id="circle" className=''>
        <svg
          x="0px"
          y="0px"
          width="300px"
          // height="300px"
          viewBox="0 0 300 300"
          enableBackground="new 0 0 300 300"
          xmlSpace="preserve"
        >
          <defs >
            <path
              id="circlePath"
              d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0"
            />
          </defs>
          <circle cx="150" cy="150" r="75" fill="none" />

          <g className="rotating" >
            <use xlinkHref="#circlePath" fill="none" />
            <text fill={color} >
              <textPath xlinkHref="#circlePath">
                PROFESSIONAL UX DESIGNER - SMIT - PROFESSIONAL UX DESIGNER
              </textPath>
            </text>
          </g>

          <text x="150" y="150" textAnchor="middle" fill="#bebdbd" dy=".3em">
            SMIT
          </text>
        </svg>
      </div>
    </div>
  );
};

export default OrbitingText;
