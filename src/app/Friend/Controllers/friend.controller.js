async function addFriend(req, res) {
    const { email, message } = req.body;
    if (email) {
      // await this.friendService.
      return res.status(200).json({
        message: 'Created'
      });
    }
    return res.status(400).json({
      message: 'Your email must be existed'
    });
  }


export default {
  addFriend,
};
