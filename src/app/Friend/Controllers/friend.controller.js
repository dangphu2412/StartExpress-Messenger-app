import AddFriendService from '../Services/addFriend.service';

async function addFriend(req, res) {
  try {
    const DENY_STATUS = 0;
    const { email, message } = req.body;
    const { id, userEmail } = req.user;

    if (email === userEmail) {
      return res.status(409).json({
        message: 'You can t add friend with your self',
      });
    }

    const service = new AddFriendService(id, email, message);

    await service.getFriendId();

    const friendStatus = await service.hasRelation();

    if (!friendStatus || friendStatus.status === DENY_STATUS) {

      // Add friend
      await service.sendRequest();
      return res.status(201).json({
        message: 'Send request success',
      });
    }

    return res.status(409).json({
      message: 'You can\' t add friend with this email',
      status: friendStatus.status,
    });

  } catch (error) {
    return res.status(400).json({
      message: 'This email is not exist',
    });
  }
}

export default {
  addFriend,
};
