import Head from 'next/head';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GetServerSideProps } from 'next';

import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';
import { auth, db } from '../../firebase';
import Loading from '../../components/Loading';
import { getRecipientEmail } from '../../utils/getRecipientEmail';

const ChatPage = ({ chat, messages }: any) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
};

export default ChatPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const ref = db.collection('chats').doc(String(query.id));

  // Preparing the messages on the server
  const messageRes = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get();

  const messages = messageRes.docs
    .map((doc) => {
      return {
        id: doc.id,
        timestamp: doc.data().timestamp,
        ...doc.data(),
      };
    })
    .map((message) => {
      return {
        ...message,
        timestamp: message.timestamp.toDate().getTime(),
      };
    });

  // Preparing the chats
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  console.log(messages);
  console.log(chat);

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
};

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }

  --ms-overflow-style: none;
  scrollbar-width: none;
`;
