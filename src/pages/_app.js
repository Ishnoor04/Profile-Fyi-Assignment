import '@/styles/tailwind.css';
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

// Main application component
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
