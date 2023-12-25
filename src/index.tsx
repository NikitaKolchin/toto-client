import {createContext} from 'react';
import App from './App';
import Store from "./store/store";
import { createRoot } from 'react-dom/client';

interface State {
    store: Store,
}

export const store = new Store();

export const Context = createContext<State>({
    store,
})

const container = document.getElementById('root')
const root = createRoot(container!); 

root.render(
    <Context.Provider value={{
        store
    }}>
        <App />
    </Context.Provider>,
);

