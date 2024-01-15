import { useState, useMemo, useDeferredValue } from 'react';
import { users } from './users';

function ResultPage() {
    const [name, setName] = useState('');
    const listUsers = useMemo(() => {
        return users.filter((item) => item.name.includes(name));
    }, [name]);
    const deferredList = useDeferredValue(listUsers);

    return (
        <div>
            <div>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div>
                    {deferredList.map((item) => (
                        <div>{item.name}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default ResultPage;
