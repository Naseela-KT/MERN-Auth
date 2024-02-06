import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import {toast} from "react-toastify"
import Loader from '../components/Loader';
import { validate } from '../validations/userLoginVal';


const LoginScreen = () => {
  const initialValues={email:'',password:''}
  const [formValues,setFormValues]=useState(initialValues)
  const [formErrors,setFormErrors]=useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login,{isLoading}] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const handleChange=(e)=>{
    const {name,value}=e.target
    setFormValues({...formValues,[name]:value})
  }


  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const errors=validate(formValues)
    setFormErrors(errors)
    if(Object.keys(errors).length===0){
    try {
      const res = await login(formValues).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Logged Successfully!");
      navigate('/');
    } catch (err) {
        toast.error(err?.data?.message || err?.error);
    }
  }
  };

  

  return (
    <FormContainer>
    <h2 className="text-center">Sign In</h2>

    <Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='email'>
        <Form.Control
          type='email'
          name='email'
          placeholder='Enter email'
          value={formValues.email}
          onChange={handleChange}
        />
    <p style={{color:'red', fontSize: '12px'}}>{formErrors.email}</p>
      </Form.Group>

      <Form.Group className='my-3' controlId='password'>
        <Form.Control
          type='password'
          name='password'
          placeholder='Enter password'
          value={formValues.password}
          onChange={handleChange}
        />
        <p style={{color:'red', fontSize: '12px'}}>{formErrors.password}</p>
      </Form.Group>

      {isLoading && <Loader />}

      <Button
        type='submit'
        variant='primary'
        className='mt-3 mx-auto d-block'
      >
        Sign In
      </Button>
    </Form>

    <Row className='py-3'>
      <Col className="text-center">
        New User? <Link to='/register'>Register</Link>
      </Col>
    </Row>
  </FormContainer>
);
  
};

export default LoginScreen;