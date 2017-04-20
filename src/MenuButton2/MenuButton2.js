import React, { Component } from 'react';
import { Motion, StaggeredMotion, spring, presets } from 'react-motion';
import styled from 'styled-components';
import {Container, Wrapper, MainBtn, FontAwesomeMainBtnIcon, FontAwesomeIcon, Circle} from 'MenuButton2/MenuButton2.style';
import FontAwesome from 'react-fontawesome'


const RADIUS = 160;
const childButtonIcons = ['pencil', 'at', 'camera', 'bell', 'comment', 'bolt', 'ban', 'code'];

const wobbeSpring = (val) => spring(val, presets.wobbly);

class MenuButton2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false
    };

    this.buttonAngles = [-180, -135, -90, -45, 0];

    this.getStyles = this.getStyles.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  getStyles(styles) {
    const { hidden } = this.state;

    return styles.map((style, i) => {
      if (i === 0) return {
        radius: !hidden ? wobbeSpring(0) : wobbeSpring(RADIUS),
      };

      return {
        radius: wobbeSpring(styles[i - 1].radius),
      };
    });
  }

  getDefaultStyles() {
    return this.buttonAngles.map((_) => ({ radius: 0 }));
  }

  toggle() {
    this.setState((state) => ({ ...state, hidden: !state.hidden}));
  }

  render() {
    const {hidden} = this.state
    const mainButtonRotation = hidden ? { rotate: spring(0, { stiffness: 500, damping: 30 }) } : { rotate: spring(-135, { stiffness: 500, damping: 30 }) };
    return (
      <Container>
        <Wrapper>
          <StaggeredMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.getStyles}>
            {(styles) =>
              <div>
                {styles.map(({ radius }, index) =>
                <Circle key={index} style={{
                  transform: `rotate(${this.buttonAngles[index]}deg) translateX(${radius}px)`
                }}>
                  <FontAwesomeIcon style={{
                    transform: `rotate(${360 - this.buttonAngles[index]}deg)`
                  }}>
                    <FontAwesome name={childButtonIcons[index]} />
                  </FontAwesomeIcon>
                </Circle>
                )}
              </div>
            }
          </StaggeredMotion>
          <MainBtn
            style={mainButtonRotation}
            onClick={this.toggle}>
              <Motion style={mainButtonRotation}>
                {({rotate}) =>
                  <FontAwesomeMainBtnIcon style={{transform: `rotate(${rotate}deg)`}}>
                    <FontAwesome name="plus" />
                  </FontAwesomeMainBtnIcon>
                }
            </Motion>
          </MainBtn>
        </Wrapper>
      </Container>
    );
  }
}

export default MenuButton2;
