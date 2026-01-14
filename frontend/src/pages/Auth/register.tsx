import { useAuth } from'@/contexts/AuthContext';
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
  const[error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await register(name, email, password);
    setLoading(false);
    
    if(result.success){
      navigate('/home');
    }else{
      setError(result.error || 'Erro ao fazer cadastro');
    }
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
            {error && (
                <div className='text-red-500 text-sm text-center bg-red-500/10 p-2 rounded'>
                    {error}
                </div>
            )}
            <AuthButton type='submit' disabled={loading}>
                {loading ? 'Carregando...': 'Enviar'}
            </AuthButton>
          </AuthForm>
            
        </AuthContainer>

    )
}

export default Register;
