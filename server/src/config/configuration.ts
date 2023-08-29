export default ()=>({
    port : parseInt(process.env.PORT,10)||3003,
    databaseUrl: process.env.DATABASE_URL,
    secretKey: process.env.SECRET_KEY,
    accessExpiresIn : process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    isPublicKey: process.env.IS_PUBLIC_KEY,
    redis_host:process.env.REDIS_HOST,
    redis_port:process.env.REDIS_PORT,
    client_host:process.env.CLIENT_HOST,
    client_port:process.env.CLIENT_PORT,
})