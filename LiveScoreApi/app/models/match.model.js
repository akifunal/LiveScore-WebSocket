// These columns will be generated 
// automatically: id, title, description, published, createdAt, updatedAt.
module.exports = (sequelize, Sequelize) => {
  const Match = sequelize.define("match", {
    title: {
      type: Sequelize.STRING
    },
    score: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Match;
};