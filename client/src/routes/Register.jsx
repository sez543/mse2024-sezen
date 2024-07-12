import {useState} from 'react';
import {Typography, TextField, Button, Box} from '@mui/material';
import {useLogin} from '../hooks/index';
import { handleRegister } from '../stores/auth/actions';
import { useNavigate } from "react-router-dom";

const requiredFields = ['username', 'passwordConfirm', 'email', 'firstName', 'lastName'];
const fieldData = [
  {
    label: 'First Name',
    id: 'firstName',
    type: 'text'
  },
  {
    label: 'Last Name',
    id: 'lastName',
    type: 'text'
  },
  {
    label: 'Email address',
    id: 'email',
    type: 'text'
  },
  {
    label: 'Username',
    id: 'username',
    type: 'text'
  },
  {
    label: 'Password',
    id: 'password',
    type: 'password'
  },
  {
    label: 'Confirm password',
    id: 'passwordConfirm',
    type: 'password'
  }
];
const validationRegexes = {
  password: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
  email: /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/gm
};

const Register = () => {
  const {handleLogin} = useLogin();
  const navigate = useNavigate();
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    firstName: '',
    lastName: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    firstName: '',
    lastName: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      firstName: '',
      lastName: ''
    };

    for (let requiredField of requiredFields) {
      if (!formData[requiredField]) {
        newErrors[requiredField] = 'Field is required';
        valid = false;
      }
    }

    // Password strength check
    if (!formData.password || !validationRegexes.password.test(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters with at least one uppercase and one lowercase letter';
      valid = false;
    }

    if (formData.email && !validationRegexes.email.test(formData.email)) {
      newErrors.email = 'Invalid email entered!';
      valid = false;
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'The two passwords do not match!';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const registerResult = await handleRegister({
        username: formData.username,
        email: formData.email,
        fullName: `${formData.firstName} ${formData.lastName}`,
        password: formData.password
      });

      if (registerResult.type === 'REGISTER_ERROR') {
        setFormError(registerResult.payload);
      } else {
        setFormError('');
        await handleLogin(formData.username, formData.password);
        navigate('/');
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
        maxWidth: '500px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        color: 'white',
        backgroundColor: '#181818'
      }}
    >
      <Typography variant="h5" component="div" textAlign={'center'} sx={{mb: 2}}>
        Register
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
      <p style={{height: '16px', color: 'red'}}>{formError}</p>
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt: 2}}>
        Sign up
      </Button>
    </Box>
  );
};

export default Register;
