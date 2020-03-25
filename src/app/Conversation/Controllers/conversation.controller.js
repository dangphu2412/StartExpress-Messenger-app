function redirectCoreView(req, res) {
  return res.redirect('/conversations');
}

function conversation(req, res) {
  return res.render('app/conversation/index');
}


export default {
  redirectCoreView,
  conversation,
};
