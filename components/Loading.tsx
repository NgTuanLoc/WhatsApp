import { WhatsApp } from '@material-ui/icons';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';

const style = {};

const Loading = () => {
  return (
    <div
      style={{
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <WhatsApp style={{ fontSize: '150px' }} />
      <ClipLoader color="#3CBC28" size={80} />
    </div>
  );
};

export default Loading;
