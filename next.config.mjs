/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        bodySizeLimit: '15mb',
      },
    },
    unstable_allowDynamic: [
      './components/UserOrders.jsx' ,
      '/node_modules/next-cloudinary/**', 
    ],
  };
  
  export default nextConfig;
  

