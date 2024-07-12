import {useState, useEffect} from 'react';
import { useParams, Navigate } from 'react-router-dom';
import {Typography, Box, Divider, Grid, Button, Modal, IconButton, Tooltip} from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import {useLogin} from '../hooks/index';
import EditTopic from '../components/EditTopic';
import Replies from '../components/Replies';

const handleTopicFetch = async (topicId, token) => {
  try {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Authorization', `Bearer ${token}`);

    const topicResponse = await fetch(`${import.meta.env.VITE_FORUM_BACKEND_SERVER}/topics/${topicId}`, {
      method: 'GET',
      headers: requestHeaders
    });

    if (topicResponse.ok) {
      const responseJSON = await topicResponse.json();
      return {success: true, payload: responseJSON};
    } else {
      return {success: false};
    }
  } catch (error) {
    return {success: false}
  }
}

const TopicPage = () => {
  let { id } = useParams();
  const {token, userData} = useLogin();
  const [open, setOpen] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);

  const [topicData, setTopicData] = useState({
    id: id,
    title: '',
    description: '',
    username: '',
    created: '',
    modified: ''
  });

  const [topicError, setTopicError] = useState(false);

  useEffect(() => {
    (async () => {
      const tokenResult = await handleTopicFetch(id, token);
      if (!tokenResult.success) {
        setTopicError(true);
        return;
      }

      setTopicData(tokenResult.payload)
    })()
  }, [id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRepliesOpen = () => setReplyModalOpen(true);
  const handleRepliesClose = () => setReplyModalOpen(false);

  return topicError ? (
    <Navigate state={{alert: 'Error fetching requested topic'}} to={'/'} />
  ) : (
    <Box
      sx={{
        maxWidth: '1200px',
        width: '100%',
        height: 'calc(100% - 40px)',
        margin: '20px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#181818',
        color: 'white'
      }}
    >
      <Grid sx={{height: '100%'}} container direction={'column'}>
        {topicData.title && topicData.title.length > 0 && (
          <Grid item>
            <Grid container>
              <Grid flex={1} item>
                <Typography variant="h5" component="div" textAlign={'center'} sx={{mb: 2}}>
                  {topicData.title}
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Replies">
                  <IconButton onClick={handleRepliesOpen} sx={{marginRight: '30px'}} aria-label="Replies">
                    <ReplyIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Divider sx={{margin: '0 30px', borderWidth: '2px', borderColor: 'white'}} orientation="vertical" variant="middle" flexItem />
          </Grid>
        )}
        {topicData.description && topicData.description.length > 0 && (
          <Grid flex={1} item>
            <p style={{margin: '30px'}}>{topicData.description}</p>
          </Grid>
        )}
        {topicData.username === userData.username && (
          <Grid item>
            <Button onClick={handleOpen} variant="contained" color="primary" fullWidth sx={{mt: 2}}>
              Edit
            </Button>
          </Grid>
        )}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div>
          <EditTopic savedTopicData={topicData} setSavedTopicData={setTopicData} handleModalClose={handleClose} />
        </div>
      </Modal>
      <Modal
        open={replyModalOpen}
        onClose={handleRepliesClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div>
          <Replies topicData={topicData} />
        </div>
      </Modal>
    </Box>
  );
};

export default TopicPage;
