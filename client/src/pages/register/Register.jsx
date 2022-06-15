import { Button, Form, Input, message } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (value) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post('/api/users/register', value);
      message.success("Register Successfully!");
      navigate("/login");
      dispatch({
        type: "HIDE_LOADING",
      });
      

    } catch(error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      message.error("Error!")
      console.log(error);
    }
  }

  useEffect(() => {
    if(localStorage.getItem("auth")) {
      localStorage.getItem("auth");
      navigate("/");
    }
  }, [navigate]);


  return (
    <div className='form'>
        <h2>POS SYSTEM</h2>
        <p>Register Account</p>
        <div className="form-group">
          <Form layout='vertical' onFinish={handlerSubmit}>
            <FormItem name="name" label="Name">
              <Input placeholder='Enter Username'/>
            </FormItem>
            <FormItem name="userId" label="Email Address">
              <Input placeholder='Enter Email Address'/>
            </FormItem>
            <FormItem name="password" label="Password">
              <Input type="password" placeholder='Enter Password'/>
            </FormItem>
            <div className="form-btn-add">
              <Button htmlType='submit' className='add-new'>Register</Button>
              <Link className='form-other' to="/login">Login Here!</Link>
            </div>
          </Form>
        </div>
    </div>
  )
}

export default Register
