// db.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Add error handling for dotenv
const result = dotenv.config();
if (result.error) {
    console.error('Error loading .env file:', result.error);
    process.exit(1);
}

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
            handleDisconnects: true
        },
        dialectOptions: {
            connectTimeout: 60000,
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        retry: {
            match: [
                /Deadlock/i,
                /SequelizeConnectionError/,
                /SequelizeConnectionRefusedError/,
                /SequelizeHostNotFoundError/,
                /SequelizeHostNotReachableError/,
                /SequelizeInvalidConnectionError/,
                /SequelizeConnectionTimedOutError/,
                /TimeoutError/,
            ],
            max: 3
        },
        logging: process.env.NODE_ENV === 'production' ? false : console.log
    }
);

const connectDB = async () => {
    const maxRetries = 5;
    let retries = 0;
    
    while (retries < maxRetries) {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ alter: false }); // Explicitly disable auto-alter
            console.log('MySQL connected and synced successfully');
            return sequelize;
        } catch (error) {
            retries++;
            console.error(`MySQL connection attempt ${retries} failed:`, {
                error: error.message,
                code: error.code,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                user: process.env.DB_USER,
                timestamp: new Date().toISOString()
            });
            
            if (retries === maxRetries) {
                console.error('Max retries reached. Exiting...');
                process.exit(1);
            }
            // Exponential backoff
            await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, retries), 10000)));
        }
    }
};

// Handle pool errors
sequelize.connectionManager.on('error', (error) => {
    console.error('Sequelize pool error:', error);
});

export { sequelize, connectDB };
