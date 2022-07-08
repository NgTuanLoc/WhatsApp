import { Avatar, IconButton, Button } from '@material-ui/core';
import { MoreVert, SearchOutlined, Chat } from '@material-ui/icons';
import styled from 'styled-components';
import * as EmailValidator from 'email-validator';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

import { auth, db } from '../firebase';
import ChatBox from './Chat';
import Loading from './Loading';

export interface ISidebarProps {}

export default function Sidebar(props: ISidebarProps) {
  const [user, loading] = useAuthState(auth);
  const userChatRef = db
    .collection('chats')
    .where('users', 'array-contains', user?.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt('Please enter an email address for the user ');

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user?.email
    ) {
      // We need to add the chat into the db 'chats' collection
      db.collection('chats').add({
        users: [user?.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail: string) => {
    return !!chatsSnapshot?.docs.find((chat) => {
      return (
        chat.data().users.find((user: string) => user === recipientEmail)
          ?.length > 0
      );
    });
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <Header>
        <UserAvatar
          src={user?.photoURL ? user?.photoURL : ''}
          onClick={() => auth.signOut()}
        />
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

      {/* List of Chats */}
      {chatsSnapshot?.docs.map((chat: any) => {
        return <ChatBox key={chat.id} id={chat.id} users={chat.data().users} />;
      })}
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
