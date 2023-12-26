// import {createContext} from 'react';
import App from './App';
// import Store from "./store/store";
import store from './store';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

// interface State {
//     store: Store,
// }

// export const store = new Store();

// export const Context = createContext<State>({
//     store,
// })

const container = document.getElementById('root')
const root = createRoot(container!); 

root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);

