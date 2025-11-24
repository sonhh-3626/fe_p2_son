'use client'

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Provider } from 'react-redux';
import { store } from '@/store/store';

interface Props {
  children: ReactNode;
}

export default function Providers(props: Props) {
  return (
    <Provider store={store}>
      <SessionProvider>
        {props.children}
      </SessionProvider>
    </Provider>
  );
}
