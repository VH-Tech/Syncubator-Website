// models/postItem.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const PostItem = sequelize.define('PostItem', {
    img: {
        type: DataTypes.TEXT('long'),
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
    imageType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'cover'
    }
}, {
    timestamps: true
});

export default PostItem;
