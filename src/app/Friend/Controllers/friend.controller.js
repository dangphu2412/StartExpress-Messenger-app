import AddFriendService from '../Services/addFriend.service';

async function addFriend(req, res) {
  try {
    const { email, message } = req.body;
    const id = req.user._token;

    const service = new AddFriendService(id, email, message);

    const friendStatus = await service.hasRelation();
    console.log(friendStatus);
    return res.status(200).json({
      message: 'Created',
    });
  } catch (error) {
    console.log(error);
    return res.status(409).json({
      message: error.message,
    })
  }
}


export default {
  addFriend,
};
