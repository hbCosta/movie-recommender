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
        <div className='min-h-screen flex items-center justify-center dark: bg-[#1a1a1a] px-4 text-white font-sans'>
            <div className='w-full max-w-lg bg-[#2a2a2a] p-10 rounded-2xl shadow-2xl border border-white/5'>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className='flex flex-col gap-2'>
                        <label className="text-sm font-medium text-gray-300">Email Address</label>
                        <input 
                        type="email" 
                        placeholder='E-mail'
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        required
                        className="w-full  px-4 py-3 bg-[#333] border border-grey-600 rounded-xl focus:ring-2
                        focus-ring-blue-500 focus:border-transparent outline-none transition-all
                        placeholder:text-grey-500"/>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="text-sm font-medium text-gray-300">Password</label>
                        <input 
                        type="password" 
                        placeholder='••••••••'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-[#333] border border-grey-600 rounded-xl  focus:ring-2 
                        focus:ring-blue-500 focus:border-transparent outline-none transition-all
                        placeholder:text-grey-500"/>
                    </div>

                    <button 
                    type='submit'
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bol py-3
                    rounded-xl transition-all shadow-lg shadow-blue-900/20 mt-4 active-scale-[0.98]">
                        Enviar
                    </button>

                    <div className="text-center mt-2 text-sm text-gray-400">
                        <span>Não tem uma conta?</span>
                        <Link to="/register" 
                        className='text-blue-400 hover:text-blue-300 font-medium transition-colors'>
                            Cadastre-se</Link>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Login;
