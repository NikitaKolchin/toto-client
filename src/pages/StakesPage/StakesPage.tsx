import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, registration } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

type Props = object;

const StakesPage = (props: Props) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuth } = useAppSelector((state) => state.auth);
    return <div>StakesPage</div>;
};

export default StakesPage;
