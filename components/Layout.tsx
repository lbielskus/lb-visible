// components/Layout.tsx
import Head from 'next/head';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode,
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Your Website Title</title>
        <meta name='description' content='Your website description' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header>{/* optional header */}</header>
      <main>{children}</main>
      <footer>{/* optional footer */}</footer>
    </>
  );
};

export default Layout;
