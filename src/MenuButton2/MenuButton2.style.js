import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #DCDCDC;
`

export const MainBtn = styled.div`
  background-color: #72B0EC;
  border-radius: 50%;
  position: absolute;
  display: flex;
	justify-content: center;
	text-align: center;
`

export const ChildBtn = styled(MainBtn)`
  background-color: #FEFEFE;
	display: flex;
	justify-content: center;
	text-align: center;
`

export const FontAwesomeIcon = styled.div`
	margin: auto;
	font-size: 1.3em;
  color: #8A98A4;
`
export const FontAwesomeMainBtnIcon = styled(FontAwesomeIcon)`
  font-size: 2em;
  color: #FEFEFE;
`
