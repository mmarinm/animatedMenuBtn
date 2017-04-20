import React, { Component } from 'react';
import { StaggeredMotion, spring, presets } from 'react-motion';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  margin-left: 40vw;
  margin-top: 20vw;
`;

const Circle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  transform-origin: 50%;
`;

const RADIUS = 200;

const wobbeSpring = (val) => spring(val, presets.wobbly);

class MenuButton2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false
    };

    this.buttonAngles = [0, 45, 90, 135, 180];

    this.getStyles = this.getStyles.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  getStyles(styles) {
    const { hidden } = this.state;
    return styles.map((style, i) => {
      if (i === 0) return {
        radius: hidden ? wobbeSpring(0) : wobbeSpring(RADIUS),
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
    return (
      <Container>
        <button onClick={this.toggle}>Toggle</button>
        <StaggeredMotion
          defaultStyles={this.getDefaultStyles()}
          styles={this.getStyles}>
          {(styles) =>
            <div>
              {styles.map(({ radius }, index) =>
                <Circle key={index} style={{
                  transform: `rotate(${this.buttonAngles[index]}deg) translateX(${radius}px)`
                }}/>
              )}
            </div>
          }
        </StaggeredMotion>
      </Container>
    );
  }
}

export default MenuButton2;