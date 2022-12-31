/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
    basePath: '/v1',
    async redirects() {
        return [
          {
            source: '/',
            destination: '/v1',
            basePath: false,
            permanent: false, // make this true if you want the redirect to be cached by the search engines and clients forever
          },
        ]
    },
}

module.exports = nextConfig
