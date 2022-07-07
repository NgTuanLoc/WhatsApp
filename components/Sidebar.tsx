import { Avatar, IconButton, Button } from '@material-ui/core';
import { MoreVert, Chat, SearchOutlined } from '@material-ui/icons';
import styled from 'styled-components';

export interface ISidebarProps {}

export default function Sidebar(props: ISidebarProps) {
  return (
    <Container>
      <Header>
        <UserAvatar />
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

      <SidebarButton>Start a new chat</SidebarButton>
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
