import React, { Component } from 'react'
// Usage range(4) returns this array [0, 1, 2, 3]
// similary range(2) retursn this array [0, 1]
// and so on
import range from 'lodash.range'
import styled from 'styled-components'
import {Motion, spring} from 'react-motion';

import './App.css'

//Constants
// Value of 1 degree in radians
const DEG_TO_RAD = 0.0174533;
// Diameter of the main button in pixels
const MAIN_BUTTON_DIAM = 90;
const CHILD_BUTTON_DIAM = 50;
// The number of child buttons that fly out from the main button
const NUM_CHILDREN = 5;
// Hard coded position values of the mainButton
const M_X = 490;
const M_Y = 300;

// How far away from the main button does the child buttons go
const FLY_OUT_RADIUS = 120,
	SEPARATION_ANGLE = 40, //degrees
	FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE, //degrees
	BASE_ANGLE = ((180 - FAN_ANGLE)/2); // degrees

// Utility functions

// Since JS Math. functions accept value of angle in radians and we've been working in degrees we will need to covert
// degrees to radians first.
function toRadians(degrees) {
	return degrees * DEG_TO_RAD;
}

function finalDeltaPositions(index) {
	let angle = BASE_ANGLE + ( index * SEPARATION_ANGLE );
	return {
		deltaX: FLY_OUT_RADIUS * Math.cos(toRadians(angle)) - (CHILD_BUTTON_DIAM/2),
		deltaY: FLY_OUT_RADIUS * Math.sin(toRadians(angle)) + (CHILD_BUTTON_DIAM/2)
	};
}

//styled components
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #DCDCDC;
`

const MainBtn = styled.div`
  background-color: #72B0EC;
  border-radius: 50%;
  position: absolute;
`

const ChildBtn = styled(MainBtn)`
  background-color: #FEFEFE;
`

class App extends Component {
  constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		};

		// Bind this to the functions
		this.openMenu = this.openMenu.bind(this);
	}

  mainButtonStyles() {
		return {
			width: MAIN_BUTTON_DIAM,
			height: MAIN_BUTTON_DIAM,
			top: M_Y - (MAIN_BUTTON_DIAM/2),
			left: M_X - (MAIN_BUTTON_DIAM/2),
		};
	}

  initialChildButtonStyles() {
		return {
			width: CHILD_BUTTON_DIAM,
			height: CHILD_BUTTON_DIAM,
      top: spring(M_Y - (CHILD_BUTTON_DIAM/2)),
			left: spring(M_X - (CHILD_BUTTON_DIAM/2))
		};
	}

  finalChildButtonStyles(childIndex) {
  		let{deltaX, deltaY} = finalDeltaPositions(childIndex);
  		return {
  			width: CHILD_BUTTON_DIAM,
  			height: CHILD_BUTTON_DIAM,
        left: spring(M_X + deltaX),
  			top: spring(M_Y - deltaY)
  		};
  	}

  	openMenu() {
  		let{isOpen} = this.state;
  		this.setState({
  			isOpen: !isOpen
  		});
  	}

  	render() {
  		let {isOpen} = this.state;
      return (
			<Container>
				{range(NUM_CHILDREN).map( index => {
					let style = isOpen ? this.finalChildButtonStyles(index) : this.initialChildButtonStyles();
					return (
						<Motion style={style} key={index}>
							{({width, height, top, left}) =>
								<ChildBtn
									style={{
										width: width,
										height: height,
										top: top,
										left: left
									}}/>
							}
						</Motion>
					);
				})}
				<MainBtn
					style={this.mainButtonStyles()}
					onClick={this.openMenu}/>
			</Container>
		);
  	}
}

export default App;
