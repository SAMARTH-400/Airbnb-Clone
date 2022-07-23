import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import {store} from '../store';
import {Provider} from 'react-redux';
import { SessionProvider } from 'next-auth/react';


const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className:"z-50",
  delay: 100
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }) {
  return(
    <SessionProvider session={pageProps.session}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    </SessionProvider>
  ); 
}

export default MyApp
