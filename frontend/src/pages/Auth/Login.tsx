import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você faria a chamada para sua API de Autenticação
    console.log('Login efetuado com:', { email, password });
    
    // Se sucesso, redireciona para a Home
    navigate('/dashboard');
    };

    return(
        <div>
            <form action="">
                <h2>Entrar</h2>
                <input 
                type="email" 
                placeholder='E-mail'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
                />
                <input 
                type="password" 
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button type='submit'>Entrar</button>
                <p>Não tem uma conta?</p><Link to="/register">Cadastre-se</Link>
            </form>
        </div>
    )

}

export default Login;
