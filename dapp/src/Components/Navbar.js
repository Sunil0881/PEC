import React from 'react'
import '@rainbow-me/rainbowkit/styles.css';
import { Link } from 'react-router-dom';

import {ConnectButton,getDefaultConfig,RainbowKitProvider} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  polygonMumbai,
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [polygonMumbai,sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();


const Button = () => {
  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider >
      <div className='flex justify-between px-6 py-3 bg-transparent top-0 z-50 fixed shadow-2xl w-full backdrop-filter backdrop-blur-lg bg-opacity-20 items-center font-serif'>
        <h1 className='text-2xl lg:text-3xl'>Crypto Commerce..</h1>
        <div className='flex pl-48 '>
          <Link to="/" className='text-lg pl-80'>Home</Link>
          <Link to="/" className='text-lg pl-10'>About</Link>
          <Link to="/buy" className='text-lg pl-10'>Buy</Link>
          <Link to="/sell" className='text-lg pl-10'>Sell</Link>
        </div>
        <div>
         <ConnectButton />
        </div>
      </div>
        </RainbowKitProvider>   
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Button