import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { validate } from '../validations/userRegisterVal';

const RegisterScreen = () => {
  const initialValues={name:'',email:'',password:'',confirmPassword:''}
  const [formValues,setFormValues]=useState(initialValues)
  const [formErrors,setFormErrors]=useState('')
  


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange=(e)=>{
    const {name,value}=e.target
    setFormValues({...formValues,[name]:value})
  }


  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);


  const submitHandler = async (e) => {
    e.preventDefault();
    const errors=validate(formValues)
    setFormErrors(errors)
    if(Object.keys(errors).length===0){
    try {
      const res = await register(formValues).unwrap();
      toast.success("Registered Successfully");
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {

        toast.error(err?.data?.message || err?.error);
    }
  }};

  return (
    <FormContainer>
      <h2 className="text-center">Sign up</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="name">
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={formValues.name}
            onChange={handleChange}
            name="name"
          />
          <p style={{color:'red', fontSize: '12px'}}>{formErrors.name}</p>
          
        </Form.Group>
        <Form.Group className="my-3" controlId="email">
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formValues.email}
            onChange={handleChange}

          />
          <p style={{color:'red', fontSize: '12px'}}>{formErrors.email}</p>
        </Form.Group>
        <Form.Group className="my-3" controlId="password">
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formValues.password}
            onChange={handleChange}
          />
       <p style={{color:'red', fontSize: '12px'}}>{formErrors.password}</p>
        </Form.Group>
        <Form.Group className="my-3" controlId="confirmPassword">
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
          <p style={{color:'red', fontSize: '12px'}}>{formErrors.confirmPassword}</p>
        </Form.Group>

        {isLoading && <Loader />}
        <Button
          type="submit"
          variant="primary"
          className="mt-3 mx-auto d-block"
        >
          Sign Up
        </Button>
        <Row className="py-3">
          <Col className="text-center">
            Already have an account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
