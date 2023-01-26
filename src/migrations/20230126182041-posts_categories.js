'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts_categories', {
      post_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'blog_posts',
          key: 'id'
        },
        primaryKey: true,
        onDelete: 'CASCADE',
      },
      category_id: {
        type: Sequelize.INTEGER, 
        references: {
          model: 'categories',
          key: 'id'
        },
        primaryKey: true,
        onDelete: 'CASCADE',
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('post_categories');
  }
};
