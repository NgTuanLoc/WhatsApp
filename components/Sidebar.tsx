import { Avatar, IconButton, Button } from '@material-ui/core';
import { MoreVert, Chat, SearchOutlined } from '@material-ui/icons';
import styled from 'styled-components';
import * as EmailValidator from 'email-validator';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, db } from '../firebase';

export interface ISidebarProps {}

export default function Sidebar(props: ISidebarProps) {
  const [user] = useAuthState(auth);
  const createChat = () => {
    const input = prompt('Please enter an email address for the user ');

    if (!input) return null;

    if (EmailValidator.validate(input) && input !== user?.email) {
      // We need to add the chat into the db 'chats' collection
      db.collection('chats').add({
        users: [user?.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail: any) => {};

  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchOutlined />
        <SearchInput placeholder="Search in chat" />
      </Search>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
    </Container>
  );
}

const Container = styled.aside``;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  transition: all 0.5s linear;
  :hover {
    opacity: 0.8;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;

  /* Increase specifilities for this SidebarButton style */
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const IconsContainer = styled.div``;
