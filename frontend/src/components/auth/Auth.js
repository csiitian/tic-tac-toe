import React, { useState } from 'react';
import { auth, googleProvider, githubProvider } from '../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import styled from "styled-components";

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGithubSignIn = async () => {
        setError('');
        try {
            await signInWithPopup(auth, githubProvider);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <AuthContainer>
            <AuthBox>
                <AuthHeading>{isLogin ? 'Login' : 'Sign Up'}</AuthHeading>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <AuthForm onSubmit={handleSubmit}>
                    <InputContainer>
                        <label>Email:</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <label>Password:</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </InputContainer>
                    <SubmitButton type="submit">{isLogin ? 'Login' : 'Sign Up'}</SubmitButton>
                </AuthForm>
                <SwitchButton onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Create an account' : 'Already have an account?'}
                </SwitchButton>
                <Divider />
                <SocialButton onClick={handleGoogleSignIn}>Sign in with Google</SocialButton>
                <SocialButton onClick={handleGithubSignIn}>Sign in with GitHub</SocialButton>
            </AuthBox>
        </AuthContainer>
    );
}

export default Auth;

const AuthContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(70,130,180,0.8) 0%, rgba(255,255,255,0) 100%),
    url('https://source.unsplash.com/random') no-repeat center center/cover;
`;

const AuthBox = styled.div`
    width: 50vw;
    max-width: 400px; /* Maximum width */
    min-width: 200px; /* Minimum width */
    background: rgba(255, 255, 255, 0.85);
    padding: 20px 40px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.5s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.5);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

const AuthHeading = styled.h2`
    margin-bottom: 20px;
    color: #333;
`;

const ErrorMessage = styled.p`
    color: red;
    margin-bottom: 20px;
`;

const AuthForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputContainer = styled.div`
    margin: 10px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    label {
        margin-bottom: 5px;
        color: #333;
    }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.3s ease;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const SwitchButton = styled.button`
  margin-top: 10px;
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.div`
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #ccc;
    margin: 10px;
`;

const SocialButton = styled.button`
  padding: 10px 20px;
  background-color: #db4437; /* Default to Google button color */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #c23321;
  }
  &:nth-child(5) {
    background-color: #333; /* GitHub button color */
    &:hover {
      background-color: #24292e;
    }
  }
`;
