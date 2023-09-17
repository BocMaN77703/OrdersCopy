/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        HOST: process.env.HOST,
        SERVER_PORT: process.env.SERVER_PORT || 3003,
    },
}

module.exports = nextConfig
