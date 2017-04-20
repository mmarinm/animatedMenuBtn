import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #DCDCDC;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Wrapper = styled.div`
  position: relative;
`;

export const MainBtn = styled.div`
  background-color: #72B0EC;
  position: relative;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  text-align: center;
  z-index: 10;
`

export const Circle = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #FEFEFE;;
  position: absolute;
  transform-origin: 50%;
  top: 22.25%;
  left: 22.25%;
  z-index: 1;
  display: flex;
	justify-content: center;
	text-align: center;
`;

export const FontAwesomeIcon = styled.div`
	margin: auto;
	font-size: 1.3em;
  color: #8A98A4;
`
export const FontAwesomeMainBtnIcon = styled(FontAwesomeIcon)`
  font-size: 2em;
  color: #FEFEFE;
`
