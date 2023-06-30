import 'reset-css-complete/reset.css';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import useSetVPVars from '@/hooks/use-set-vp-vars';

export default function App({ Component, pageProps }: AppProps) {
  useSetVPVars();
  return <Component {...pageProps} />;
}
