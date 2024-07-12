import {useEffect, useState} from 'react';
import {Typography, TextField, Button, Box} from '@mui/material';
import {useLogin} from '../hooks/index';

const fieldData = [
  {
    label: 'Title',
    id: 'title',
    type: 'text'
  },
  {
    label: 'Description',
    id: 'description',
    type: 'textarea'
  }
];

const handleTopicCreation = async (topicData, token, topicId) => {
  try {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Authorization', `Bearer ${token}`);

    const topicCreationResponse = await fetch(`${import.meta.env.VITE_FORUM_BACKEND_SERVER}/topics/${topicId}`, {
      body: JSON.stringify(topicData),
      method: 'PUT',
      headers: requestHeaders
    });

    if (topicCreationResponse.ok) {
      const responseJSON = await topicCreationResponse.json();

      return {success: true, payload: responseJSON};
    } else {
      return {success: false, msg: 'Topic edit failed! Please try again'};
    }
  } catch (error) {
    return {success: false, msg: error};
  }
};

const EditTopic = (props) => {
  const { savedTopicData, setSavedTopicData, handleModalClose } = props;
  const {userData, token} = useLogin();
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    title: savedTopicData.title,
    description: savedTopicData.description
  });

  useEffect(() => {
    setFormData({
      title: savedTopicData.title,
      description: savedTopicData.description
    })
  }, [savedTopicData])

  const [errors, setErrors] = useState({
    title: '',
    description: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {title: '', description: ''};

    if (!formData.title) {
      newErrors.title = 'Title is required';
      valid = false;
    }

    if (!formData.description) {
      newErrors.description = 'Topic description is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const tokenCreationResult = await handleTopicCreation(
        {
          title: formData.title,
          description: formData.description,
          username: userData.username
        },
        token,
        savedTopicData.id
      );
      if (tokenCreationResult.success) {
        setFormError('');
        setSavedTopicData(tokenCreationResult.payload);
        handleModalClose();
      } else {
        setFormError(tokenCreationResult.msg);
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
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: '1000px',
        width: '100%',
        margin: 'auto',
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
      <Typography variant="h5" component="div" textAlign={'center'} sx={{mb: 2}}>
        Edit Topic
      </Typography>
      {fieldData.map((field) => {
        return field.type === 'textarea' ? (
          <TextField
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
            multiline
            rows={15}
          />
        ) : (
          <TextField
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
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt: 2}}>
        Save
      </Button>
      <p style={{height: '16px', color: 'red'}}>{formError}</p>
    </Box>
  );
};

export default EditTopic;
