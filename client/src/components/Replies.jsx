import {useState, useEffect} from 'react';
import {Typography, List, Box, ListItemAvatar, Avatar, ListItemText, Grid, IconButton, TextField} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SendIcon from '@mui/icons-material/Send';
import {useLogin} from '../hooks/index';
import {deepOrange} from '@mui/material/colors';

const fieldData = [
  {
    label: 'Reply message',
    id: 'text',
    type: 'text'
  }
];

const PAGE_SIZE = 8;

const fetchReplies = async (topicData, token, page) => {
  try {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Authorization', `Bearer ${token}`);

    const topicCreationResponse = await fetch(`${import.meta.env.VITE_FORUM_BACKEND_SERVER}/replies/${topicData.id}?page=${page}&pageSize=${PAGE_SIZE}`, {
      method: 'GET',
      headers: requestHeaders
    });

    if (topicCreationResponse.ok) {
      const responseJSON = await topicCreationResponse.json();

      return {success: true, payload: responseJSON};
    } else {
      return {success: false};
    }
  } catch (error) {
    return {success: false, msg: error};
  }
};

const newReply = async (replyText, username, topicId, token) => {
  try {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Authorization', `Bearer ${token}`);

    const topicCreationResponse = await fetch(`${import.meta.env.VITE_FORUM_BACKEND_SERVER}/replies`, {
      method: 'POST',
      body: JSON.stringify({
        text: replyText,
        username: username,
        topicId: topicId
      }),
      headers: requestHeaders
    });

    if (topicCreationResponse.ok) {
      const responseJSON = await topicCreationResponse.json();

      return {success: true, payload: responseJSON};
    } else {
      return {success: false, msg: 'Reply creation failed. Please try again.'};
    }
  } catch (error) {
    return {success: false, msg: error};
  }
};

const Replies = (props) => {
  const {topicData} = props;
  const {userData, token} = useLogin();
  const [formError, setFormError] = useState('');
  const [replies, setReplies] = useState([]);
  const [page, setPage] = useState(0);
  const [paginationMeta, setPaginationMeta] = useState({});
  const [pagingButtonsEnabled, setPagingButtonsEnabled] = useState({
    prev: false,
    next: false
  });
  const [pedingReplyRefresh, setPendingReplyRefresh] = useState(false);

  const [formData, setFormData] = useState({
    text: ''
  });

  const [errors, setErrors] = useState({
    text: ''
  });

  const handleReplyFetch = async () => {
    const replyResponseData = await fetchReplies(
      topicData,
      token,
      page
    );

    if (replyResponseData.success) {
      setReplies(replyResponseData.payload.content);
      setPaginationMeta({
        totalPages: replyResponseData.payload.totalPages,
        totalElements: replyResponseData.payload.totalElements
      });
    }
  };

  useEffect(() => {
    (async () => {
      await handleReplyFetch();
    })()
  }, [topicData, page]);

  useEffect(() => {
    (async () => {
      if (pedingReplyRefresh) {
        await handleReplyFetch();
        setPendingReplyRefresh(false);
      }
    })()
  }, [pedingReplyRefresh]);

  useEffect(() => {
    setPagingButtonsEnabled({
      prev: page > 0,
      next: page + 1 < paginationMeta.totalPages
    });
  }, [paginationMeta]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {text: ''};

    if (!formData.text) {
      newErrors.text = 'Message is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const incrementPage = () => setPage(page + 1);
  const decrementPage = () => setPage(page - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newReplyResult = await newReply(
        formData.text,
        userData.username,
        topicData.id,
        token
      );
      if (newReplyResult.success) {
        setFormError('');
        setFormData({
          text: ''
        });
        setPendingReplyRefresh(true);
      } else {
        setFormError(newReplyResult.msg);
      }
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <Box
      sx={{
        maxWidth: '1000px',
        width: '100%',
        height: 'calc(100% - 100px)',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#181818',
        color: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #fff',
        boxShadow: 24,
        p: 4
      }}
    >
      <Grid flexWrap={'nowrap'} sx={{height: '100%'}} direction={'column'} container>
        <Grid item>
          <Typography variant="h5" component="div" textAlign={'center'} sx={{mb: 2}}>
            Replies for topic
          </Typography>
        </Grid>
        <Grid flex={1} item>
          <List sx={{mb: 2, height: '100%'}}>
            {replies.map(({text, username}) => (
              <Grid
                alignItems={'center'}
                sx={{marginBottom: '10px'}}
                key={text}
                container
              >
                <Grid item>
                  <ListItemAvatar>
                    <Avatar sx={username === userData.username ? {bgcolor: deepOrange[700], color: 'white'} : null} alt={username} src={username} />
                  </ListItemAvatar>
                </Grid>
                <Grid item>
                  <ListItemText primary={username} secondary={text} />
                </Grid>
              </Grid>
            ))}
            {replies.length === 0 && (
              <Grid alignItems={'center'} justifyContent={'center'} sx={{height: '100%'}} container>
                <Typography variant="h5" component="div" textAlign={'center'} sx={{mb: 2}}>
                  No replies for topic found!
                </Typography>
              </Grid>
            )}
          </List>
        </Grid>
        <Grid item>
          <Box>
            <Grid gap={2} alignItems={'center'} justifyContent={'center'} container>
              <Grid item>
                <IconButton disabled={!pagingButtonsEnabled.prev} onClick={decrementPage}>
                  <ArrowBackIosIcon />
                </IconButton>
              </Grid>
              <Grid item>
                  Page {page + 1} out of {paginationMeta?.totalPages || 1}
              </Grid>
              <Grid item>
                <IconButton disabled={!pagingButtonsEnabled.next} onClick={incrementPage}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item>
          <Box
            component="form"
            onSubmit={handleSubmit}
          >
            <Grid alignItems={'center'} gap={2} container>
              <Grid flex={1} item>
                {fieldData.map((field) => {
                  return (
                    <TextField
                      size="small"
                      key={field.id}
                      fullWidth
                      label={field.label}
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleChange}
                      error={Boolean(errors[field.id])}
                      helperText={errors[field.id]}
                      type={field.type}
                      margin="normal"
                    />
                  );
                })}
              </Grid>
              <Grid sx={{marginTop: '5px'}} item>
                <IconButton type="submit" variant="contained" color="primary">
                  <SendIcon />
                </IconButton>
              </Grid>
            </Grid>
            <p style={{height: '16px', color: 'red', marginBottom: 0, marginTop: '5px'}}>{formError}</p>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Replies;
