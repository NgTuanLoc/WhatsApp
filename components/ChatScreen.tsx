import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Avatar, IconButton } from '@material-ui/core';
import { MoreVertOutlined, AttachFileOutlined } from '@material-ui/icons';

import { IChatScreen } from '../typing';
import { auth, db } from '../firebase';
import { useRouter } from 'next/router';

const ChatScreen = ({ chat, messages }: IChatScreen) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>Recipient email</h3>
          <p>Last seen ...</p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileOutlined />
          </IconButton>
          <IconButton>
            <MoreVertOutlined />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {/* Show Message */}
        <EndOfMessage />
      </MessageContainer>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 1000;
  top: 0;
  display: flex;
  align-items: center;
  height: 70px;
  padding: 10px;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 2px;
  }

  > p {
    font-size: 14px;
    color: gray;
    padding: 0;
  }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div``;

const EndOfMessage = styled.div``;
