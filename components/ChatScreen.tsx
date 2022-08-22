import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Avatar, IconButton } from '@material-ui/core';
import {
  MoreVertOutlined,
  AttachFileOutlined,
  InsertEmoticonOutlined,
  Mic,
  Send,
  ToggleOffOutlined,
} from '@material-ui/icons';
import { useState, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';
import firebase from 'firebase';
import TimeAgo from 'timeago-react';

import { IChatScreen } from '../typing';
import { auth, db } from '../firebase';
import Message from '../components/Message';
import { getRecipientEmail } from '../utils/getRecipientEmail';
import { useGlobalContext } from '../context/context';

const ChatScreen = ({ chat, messages }: IChatScreen) => {
  const { hideSidebar, setHideSidebar } = useGlobalContext();

  const [user] = useAuthState(auth);
  const [input, setInput] = useState<string>('');
  const router = useRouter();
  const endOfMessageRef = useRef<any>(null);
  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(String(router.query.id))
      .collection('messages')
      .orderBy('timestamp', 'asc')
  );
  const [recipientSnapshot] = useCollection(
    db
      .collection('users')
      .where('email', '==', getRecipientEmail(chat.users, user))
  );

  const ScrollToBottom = () => {
    if (endOfMessageRef) {
      endOfMessageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const sendMessage = (e: any) => {
    e.preventDefault();
    // Update the last seen
    db.collection('users').doc(user?.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection('chats')
      .doc(String(router.query.id))
      .collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user?.email,
        photoURL: user?.photoURL,
      });
    setInput('');
    ScrollToBottom();
  };

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => {
        return (
          <Message
            key={message.id}
            user={message.data().user}
            message={{
              ...message.data(),
              timestamp: message.data().timestamp?.toDate().getTime(),
            }}
          />
        );
      });
    } else {
      return JSON.parse(messages).map((message: any) => {
        return (
          <Message key={message.id} user={message.user} message={message} />
        );
      });
    }
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoUrl} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}
        <HeaderInformation>
          <h3>
            {recipientEmail.length > 12
              ? `${recipientEmail.substring(0, 12)}...`
              : recipientEmail}
          </h3>
          {recipientSnapshot ? (
            <p>
              Last active:{' '}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                'Unavailable'
              )}
            </p>
          ) : (
            <p>Loading Last Active...</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton
            className="display-none-in-large-device"
            onClick={() => setHideSidebar(!hideSidebar)}
          >
            <ToggleOffOutlined />
          </IconButton>
          <IconButton>
            <AttachFileOutlined />
          </IconButton>
          <IconButton>
            <MoreVertOutlined />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessageRef} />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticonOutlined />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <SendButton disabled={!input} type="submit" onClick={sendMessage}>
          <Send />
        </SendButton>
        <Mic />
      </InputContainer>
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
  height: 100px;
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

const MessageContainer = styled.div`
  padding-inline-end: 30px;
  background-color: #e5ded8;
  min-height: 100vh;
  overflow-y: scroll;
`;

const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;

const InputContainer = styled.form`
  display: flex;
  position: sticky;
  bottom: 0;
  padding: 10px;
  align-items: center;
  background-color: whtie;
  z-index: 100;
`;

const Input = styled.input`
  flex: 1;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: whitesmoke;
  z-index: 100;
  outline: none;
  border: none;
  border-radius: 10px;
  margin: auto 10px;
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 10px;
  background-color: #007dc06b;
  border: transparent;
  svg {
    color: pink;
  }
`;
