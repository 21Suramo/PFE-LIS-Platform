const User = require('../modules/user');
const Team = require('../modules/team');
const Article = require('../modules/article');
const Event = require('../modules/event');

exports.getStats = async (req, res) => {
  try {
    const [userCount, teamCount, articleCount, eventCount] = await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Article.countDocuments(),
      Event.countDocuments({ origine: 'LIS' }),
    ]);

    res.json({
      users: userCount,
      teams: teamCount,
      articles: articleCount,
      events: eventCount,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to load dashboard statistics',
      error: error.message,
    });
  }
};