import addFriendRepo from '../Repositories/addFriend.repository';

class AddFriend {
    constructor(senderId, email, message) {
        this.sender = senderId;
        this.email = email;
        this.message = message;
    }

    hasRelation() {
        return addFriendRepo.getRelation(this.sender, this.email);
    }
}

export default AddFriend;
