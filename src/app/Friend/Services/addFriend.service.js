import addFriendRepo from '../Repositories/addFriend.repository';

class AddFriend {
    constructor(senderId, email, message) {
        this.senderId = senderId;
        this.email = email;
        this.message = message;
        this.friendId = '';
    }

    async getFriendId() {
        console.log('Getting id');
        const { id } = await this.getFriendIdByEmail(this.email);
        this.friendId = id;
        console.log(this.friendId);
    }

    getFriendIdByEmail(receiverEmail) {
        return addFriendRepo.getFriendIdByEmail(receiverEmail);
    }

    hasRelation() {
        return addFriendRepo.getRelation(this.senderId, this.friendId);
    }

    async sendRequest() {
        console.log('Creating');
        await Promise.all([
            addFriendRepo.createRequest(this.senderId, this.friendId, this.message),
            addFriendRepo.createResponse(this.senderId, this.friendId, this.message),
        ]);
        console.log('Success');
    }
}

export default AddFriend;
