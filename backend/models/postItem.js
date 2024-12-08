// models/postItem.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const PostItem = sequelize.define('PostItem', {
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    imageType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'cover'
    }
});

export default PostItem;
