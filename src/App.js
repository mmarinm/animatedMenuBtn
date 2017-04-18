import React, { Component } from 'react'
// Usage range(4) returns this array [0, 1, 2, 3]
// similary range(2) retursn this array [0, 1]
// and so on
import range from 'lodash.range'
import styled from 'styled-components'
import {Motion, spring} from 'react-motion'
import FontAwesome from 'react-fontawesome'

import './App.css'

//Constants
const SPRING_CONFIG = { stiffness: 400, damping: 28 };
// Value of 1 degree in radians
const DEG_TO_RAD = 0.0174533;
// Diameter of the main button in pixels
const MAIN_BUTTON_DIAM = 90;
const CHILD_BUTTON_DIAM = 50;
// The number of child buttons that fly out from the main button
const NUM_CHILDREN = 5;
// Hard coded position values of the mainButton
//const M_X = 490;
 let M_X;
 let M_Y;
// const M_Y = 300;

// How far away from the main button does the child buttons go
const FLY_OUT_RADIUS = 120,
	SEPARATION_ANGLE = 40, //degrees
	FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE, //degrees
	BASE_ANGLE = ((180 - FAN_ANGLE)/2); // degrees

// Names of icons for each button retreived from fontAwesome, we'll add a little extra just in case
// the NUM_CHILDREN is changed to a bigger value
let childButtonIcons = ['pencil', 'at', 'camera', 'bell', 'comment', 'bolt', 'ban', 'code'];

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
	display: flex;
	justify-content: center;
	text-align: center;
`

const FontAwesomeIcon = styled.div`
	margin: auto;
	font-size: 1.3em;
`


class App extends Component {
  constructor(props) {
		super();

		this.state = {
			isOpen: false,
			childButtons: [],
			M_Y: null,
			M_X: null
		};

		// Bind this to the functions
		this.openMenu = this.openMenu.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.updateChildButton = this.updateChildButton.bind(this);
	}
	componentWillMount() {
		M_Y = window.innerHeight / 2;
		M_X = window.innerWidth / 2;

		this.setState({
			M_Y,
			M_X
		});
	}

	componentDidMount() {
		this.updateChildButton()
		window.addEventListener("resize", this.updateDimensions);
		window.addEventListener("resize", this.updateChildButton);
	}

	updateChildButton(){
		let childButtons = [];
		range(NUM_CHILDREN).forEach(index => {
	 		childButtons.push(this.renderChildButton(index));
	 	});
		this.setState({childButtons: childButtons.slice(0)});
	}

	updateDimensions() {
		M_Y = window.innerHeight / 2;
		M_X = window.innerWidth / 2;
		this.setState({
			M_Y,
			M_X
		});
	}

  mainButtonStyles(M_Y, M_X) {
		return {
			width: MAIN_BUTTON_DIAM,
			height: MAIN_BUTTON_DIAM,
			top: M_Y - (MAIN_BUTTON_DIAM/2),
			left: M_X - (MAIN_BUTTON_DIAM/2),
		};
	}

  initialChildButtonStyles(M_Y, M_X) {
		return {
			width: CHILD_BUTTON_DIAM,
			height: CHILD_BUTTON_DIAM,
      top: spring(M_Y - (CHILD_BUTTON_DIAM/2), SPRING_CONFIG),
			left: spring(M_X - (CHILD_BUTTON_DIAM/2), SPRING_CONFIG)
		};
	}

  finalChildButtonStyles(childIndex, M_Y, M_X) {
  		let{deltaX, deltaY} = finalDeltaPositions(childIndex);
  		return {
  			width: CHILD_BUTTON_DIAM,
  			height: CHILD_BUTTON_DIAM,
        left: spring(M_X + deltaX, SPRING_CONFIG),
  			top: spring(M_Y - deltaY, SPRING_CONFIG)
  		};
  	}

  	openMenu() {
  		let{isOpen} = this.state;
  		this.setState({
  			isOpen: !isOpen
  		});
			range(NUM_CHILDREN).forEach((index) => {
				let {childButtons} = this.state;
				setTimeout(() => {
					childButtons[childButtons.length - 1 - index]	= this.renderChildButton(childButtons.length - 1 - index);
					this.setState({childButtons: childButtons.slice(0)});
				}, index * 100);
			});
  	}

		renderChildButton(index) {
			let {isOpen, M_Y, M_X} = this.state
			let style = isOpen ? this.finalChildButtonStyles(index, M_Y, M_X) : this.initialChildButtonStyles(M_Y, M_X);
			return (
				<Motion style={style} key={index}>
					{({width, height, top, left}) =>
						<ChildBtn
							style={{
								width: width,
								height: height,
								top: top,
								left: left
							}}>
								<FontAwesomeIcon>
									<FontAwesome name={childButtonIcons[index]} />
								</FontAwesomeIcon>
						</ChildBtn>
					}
				</Motion>
			);

		}

  	render() {
  		let {childButtons, M_Y, M_X} = this.state;

      return (
			<Container>
				{/* why this doesn't work with forEach loop???? */}
				{range(NUM_CHILDREN).map((index) => {
			 		return childButtons[index];
			 	})}
				<MainBtn
					style={this.mainButtonStyles(M_Y, M_X)}
					onClick={this.openMenu}/>
			</Container>
		);
  	}
}

export default App;
