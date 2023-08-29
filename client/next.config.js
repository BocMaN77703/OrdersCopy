/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        HOST : process.env.HOST,
        PORT : process.env.PORT,
    },
}

module.exports = nextConfig
