import {useState} from 'react';
import {Typography, TextField, Button, Link, Box} from '@mui/material';

const fieldData = [
  {
    label: 'Username',
    id: 'username',
    type: 'text'
  },
  {
    label: 'Password',
    id: 'password',
    type: 'password'
  }
];

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {username: '', password: ''};

    if (!formData.username) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    // Password strength check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters with at least one uppercase and one lowercase letter';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Add your login logic here
      console.log('Login successful');
    } else {
      console.log('Login failed');
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
        maxWidth: '500px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#181818',
        color: 'white'
      }}
    >
      <Typography variant="h5" component="div" textAlign={'center'} sx={{mb: 2}}>
        Login
      </Typography>
      {fieldData.map((field) => {
        return (
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
        Login
      </Button>
      <Box sx={{mt: 2, textAlign: 'center'}}>
        <Box mt={1}>
          <Link href="/register" variant="body2">
            Don&apos;t have an account? Sign Up
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
