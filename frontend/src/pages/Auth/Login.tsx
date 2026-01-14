import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthContainer from '@/components/Auth/AuthContainer';
import AuthInput from '@/components/Auth/AuthInput';
import AuthButton from '@/components/Auth/AuthButton';
import AuthForm from '@/components/Auth/AuthForm';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    setLoading(false);
    if(result.success){
        navigate('/Home');
    }else{
        setError(result.error || 'Erro ao fazer login');
    }
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
                {error && (
                    <div className='text-red-500 text-sm text-center bg-red-500/10 p-2 rounded'>
                        {error}
                    </div>
                )}
                <AuthButton type='submit' disabled={loading}>
                    {loading ? 'Carregando...': 'Enviar'}
                </AuthButton>

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
