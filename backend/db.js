// db.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

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
            idle: 10000
        },
        dialectOptions: {
            connectTimeout: 60000,
            // Add SSL if your MySQL server requires it
            // ssl: {
            //     require: true,
            //     rejectUnauthorized: false
            // }
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
            await sequelize.sync();
            console.log('MySQL connected and synced successfully');
            return;
        } catch (error) {
            retries++;
            console.error(`MySQL connection attempt ${retries} failed:`, {
                error: error.message,
                code: error.code,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                user: process.env.DB_USER
            });
            
            if (retries === maxRetries) {
                console.error('Max retries reached. Exiting...');
                process.exit(1);
            }
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

export { sequelize };
export default connectDB;
