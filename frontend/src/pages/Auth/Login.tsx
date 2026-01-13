import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContainer from '@/components/Auth/AuthContainer';
import AuthInput from '@/components/Auth/AuthInput';
import AuthButton from '@/components/Auth/AuthButton';
import AuthForm from '@/components/Auth/AuthForm';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login efetuado com:', { email, password });
    navigate('/dashboard');
    };

    return(
        <AuthContainer>
            <AuthForm onSubmit={handleSubmit}>
                <AuthInput
                label="Email"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={setEmail}
                required
                />
                <AuthInput
                label="Senha"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={setPassword}
                required
                />
                <AuthButton type='submit'>Enviar</AuthButton>

                <div className="text-center mt-2 text-sm text-gray-400">
                    <span>Não tem uma conta?</span>
                    <Link to="/register" 
                    className='text-blue-400 hover:text-blue-300 font-medium transition-colors'>
                        Cadastre-se</Link>
                </div>
            </AuthForm>
        </AuthContainer>
    )

}

export default Login;
