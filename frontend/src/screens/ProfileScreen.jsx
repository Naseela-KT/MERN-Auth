import { useState, useEffect } from "react";
import { Form, Button} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { validate } from "../validations/userProfileVal";

const ProfileScreen = () => {
  const initialValues={name:'',email:'',password:'',confirmPassword:''}
  const [formValues,setFormValues]=useState(initialValues)
  const [formErrors,setFormErrors]=useState('')


  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile,{isLoading}]=useUpdateUserMutation()

  const handleChange=(e)=>{
    const {name,value}=e.target
      setFormValues({...formValues,[name]:value})
    
  }

  useEffect(() => {
    setFormValues({name:userInfo.name,email:userInfo.email})
  }, [userInfo.name, userInfo.email]);

  const submitHndler = async (e) => {
    e.preventDefault();
    const errors=validate(formValues)
    setFormErrors(errors)
    if(Object.keys(errors).length===0){
      try {
        const res=await updateProfile({
            _id:userInfo._id,
            ...formValues
        }).unwrap();
        dispatch(setCredentials({...res}));
        toast.success("Profile Updated")
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  };
  

  return (
    <FormContainer>
      <Form onSubmit={submitHndler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            name="name"
            placeholder="Enter Name"
            value={formValues.name}
            onChange={handleChange}
          />
           <p style={{color:'red', fontSize: '12px'}}>{formErrors.name}</p>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formValues.email}
            onChange={handleChange}
          />
           <p style={{color:'red', fontSize: '12px'}}>{formErrors.email}</p>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formValues.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Enter Confirm Password"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>
        {isLoading&&<Loader/>}
        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
