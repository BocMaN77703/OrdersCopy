# Use the official Redis image as the base image for the 'redis' service
FROM redis

# Expose the required port for the Redis service
EXPOSE 6379

# Use the official PostgreSQL image as the base image for the 'db' service
FROM postgres

# Set an environment variable for the PostgreSQL user
ENV POSTGRES_USER postgres

# Set an environment variable for the PostgreSQL password
ENV POSTGRES_PASSWORD password

# Expose the required port for the PostgreSQL service
EXPOSE 5432
