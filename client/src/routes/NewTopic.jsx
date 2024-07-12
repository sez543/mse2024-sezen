import {useState} from 'react';
import {Typography, TextField, Button, Box} from '@mui/material';
import {useLogin} from '../hooks/index';
import {useNavigate} from 'react-router-dom';

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

const handleTopicCreation = async (topicData, token) => {
  try {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Authorization', `Bearer ${token}`);

    const topicCreationResponse = await fetch(`${import.meta.env.VITE_FORUM_BACKEND_SERVER}/topics`, {
      body: JSON.stringify(topicData),
      method: 'POST',
      headers: requestHeaders
    });

    if (topicCreationResponse.ok) {
      const responseJSON = await topicCreationResponse.json();

      return {success: true, payload: responseJSON};
    } else {
      return {success: false, msg: 'Topic creation failed! Please try again'};
    }
  } catch (error) {
    return {success: false, msg: error};
  }
};

const NewTopic = () => {
  const {userData, token} = useLogin();
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

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
        token
      );
      if (tokenCreationResult.success) {
        setFormError('');
        navigate(`/topic-details/${tokenCreationResult.payload.id}`);
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
        margin: 'auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#181818',
        color: 'white'
      }}
    >
      <Typography variant="h5" component="div" textAlign={'center'} sx={{mb: 2}}>
        New Topic
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
        Create Topic
      </Button>
      <p style={{height: '16px', color: 'red'}}>{formError}</p>
    </Box>
  );
};

export default NewTopic;
