

const home = (req, res) => {
  res.sendStatus(200).json({result: 'ok'});
}

module.exports = {
  home
};
