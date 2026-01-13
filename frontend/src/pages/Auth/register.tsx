import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContainer from '@/components/Auth/AuthContainer';
import AuthInput from '@/components/Auth/AuthInput';
import AuthButton from '@/components/Auth/AuthButton';
import AuthForm from '@/components/Auth/AuthForm';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Cadastro efetuado com:', { name, email, password });
    navigate('/dashboard');
    };

    return(
        <AuthContainer>
          <AuthForm onSubmit={handleSubmit}>
            <AuthInput
            label='Nome'
            type='text'
            placeholder='Nome'
            value={name}
            onChange={setName}
            required
            />
            <AuthInput
            label='Email'
            type='email'
            placeholder='E-mail'
            value={email}
            onChange={setEmail}
            required
            />
            <AuthInput
            label='Senha'
            type='password'
            placeholder='••••••••'
            value={password}
            onChange={setPassword}
            required
            />
            <AuthButton type='submit'>Enviar</AuthButton>
          </AuthForm>
            
        </AuthContainer>

    )
}

export default Register;
