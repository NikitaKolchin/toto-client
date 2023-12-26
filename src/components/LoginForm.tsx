import {FC, useState} from 'react';
import { useAppDispatch } from '../store/hooks';
import { login, registration } from '../store/authSlice';


const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch();


    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Пароль'
            />
            <button onClick={() => dispatch(login({email, password}))}>
                Логин
            </button>
            <button onClick={() => dispatch(registration({email, password}))}>
                Регистрация
            </button>
        </div>
    );
};

export default LoginForm;
