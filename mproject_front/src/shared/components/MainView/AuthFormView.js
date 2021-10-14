import React, { useState, useEffect } from 'react';
import AuthForm from '../../../places/pages/AuthForm';

const AuthFormView = () => {
  const [formType, setFormType] = useState('login');
  useEffect(() => {
 
  }, [formType]);

  const handleFormTypeChange = (e,buttonType) => {
      e.preventDefault()
    if (buttonType === 'registerBtn') {
      setFormType('login');
    }
    if (buttonType === 'loginBtn') {
      setFormType('register');
    }
  };

  return (
    <AuthForm formType={formType} changeFormTypeFunc={handleFormTypeChange} />
  );
};

export default AuthFormView;
