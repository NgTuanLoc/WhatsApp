import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment';

import { auth } from '../firebase';

const Message = ({ message, user }: any) => {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage = user === userLoggedIn?.email ? Sender : Reciever;

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <TimeStamp>
          {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
        </TimeStamp>
      </TypeOfMessage>
    </Container>
  );
};

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 15px;
  min-width: 60px;
  padding-right: 35px;
  padding-bottom: 25px;
  position: relative;
  text-align: right;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #5ffa7b;
`;

const Reciever = styled(MessageElement)`
  text-align: left;
  background-color: whitesmoke;
`;

const TimeStamp = styled.p`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 10px;
  margin: 5px;
  color: gray;
  text-align: right;
`;
