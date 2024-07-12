import {useState, useEffect} from 'react';
import {Typography, Box, ListItemAvatar, Avatar, ListItemText, Grid, IconButton} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useLogin} from '../hooks/index';
import {deepOrange} from '@mui/material/colors';
import {NavLink} from 'react-router-dom';

const PAGE_SIZE = 8;

const fetchTopics = async (token, page) => {
  try {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Authorization', `Bearer ${token}`);

    const topicCreationResponse = await fetch(`${import.meta.env.VITE_FORUM_BACKEND_SERVER}/topics?page=${page}&pageSize=${PAGE_SIZE}`, {
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

const Topics = (props) => {
  const {topicData} = props;
  const {userData, token} = useLogin();
  const [topics, setTopics] = useState([]);
  const [page, setPage] = useState(0);
  const [paginationMeta, setPaginationMeta] = useState({});
  const [pagingButtonsEnabled, setPagingButtonsEnabled] = useState({
    prev: false,
    next: false
  });
  const [pedingTopicRefresh, setPendingTopicRefresh] = useState(false);

  const handleTopicFetch = async () => {
    const topicResponseData = await fetchTopics(token, page);

    if (topicResponseData.success) {
      if (topicResponseData.payload.totalPages && topicResponseData.payload.content) {
        setTopics(topicResponseData.payload.content);
      }
      setPaginationMeta({
        totalPages: topicResponseData.payload.totalPages,
        totalElements: topicResponseData.payload.totalElements
      });
    }
  };

  useEffect(() => {
    (async () => {
      await handleTopicFetch();
    })();
  }, [topicData, page]);

  useEffect(() => {
    (async () => {
      if (pedingTopicRefresh) {
        await handleTopicFetch();
        setPendingTopicRefresh(false);
      }
    })();
  }, [pedingTopicRefresh]);

  useEffect(() => {
    setPagingButtonsEnabled({
      prev: page > 0,
      next: page + 1 < paginationMeta.totalPages
    });
  }, [paginationMeta]);

  const incrementPage = () => setPage(page + 1);
  const decrementPage = () => setPage(page - 1);

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        width: '100%',
        height: 'calc(100% - 40px)',
        padding: '20px',
        paddingBottom: '10px',
        color: 'white',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4
      }}
    >
      <Grid flexWrap={'nowrap'} sx={{height: '100%'}} direction={'column'} container>
        <Grid item>
          <Typography variant="h5" component="div" textAlign={'center'} sx={{mb: 2}}>
            Topics:
          </Typography>
        </Grid>
        <Grid flex={1} item>
          <Grid gap={2} container direction={'column'} sx={{mb: 2, height: '100%'}}>
            {topics.map(({title, username, id}) => (
              <NavLink style={{margin: 0}} className={'nav-link'} key={title} to={`/topic-details/${id}`}>
                <Grid alignItems={'center'} sx={{marginBottom: '10px'}} key={title} container>
                  <Grid item>
                    <ListItemAvatar>
                      <Avatar sx={username === userData.username ? {bgcolor: deepOrange[700], color: 'white'} : null} alt={username} src={username} />
                    </ListItemAvatar>
                  </Grid>
                  <Grid item>
                    <ListItemText primary={username} secondary={title} />
                  </Grid>
                </Grid>
              </NavLink>
            ))}
            {topics.length === 0 && (
              <Grid alignItems={'center'} justifyContent={'center'} sx={{height: '100%'}} container>
                <Typography variant="h5" component="div" textAlign={'center'} sx={{mb: 2}}>
                  No topics found!
                </Typography>
              </Grid>
            )}
          </Grid>
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
      </Grid>
    </Box>
  );
};

export default Topics;
