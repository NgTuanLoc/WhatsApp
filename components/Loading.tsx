import { WhatsApp } from '@material-ui/icons';
import { Circle } from 'better-react-spinkit';
import styled from 'styled-components';

const Loading = () => {
  return (
    <Wrapper>
      <WhatsApp />
      <Circle color="#3CBC28" size={60} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    width: 200px;
    height: 200px;
    color: #20c340;
    margin-bottom: 10px;
  }
`;

export default Loading;
