import React from 'react';
import AuthLayout from '../layout/AuthLayout';
import {SignupForm}from '../components';

const Signup = () => {
  return (
    <AuthLayout
      title="Ready to start your BlogSpace journey?"
      description="Create an account to start blogging today!"
      reverse={true} 
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;