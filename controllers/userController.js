const { User, Thought } = require('../models');

module.exports = {

    async fetchAllUsers(req, res) {
        try {
            const allUsers = await User.find();
            res.json(allUsers);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users' });
        }
    },

    async fetchUserById(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!singleUser) {
                return res.status(404).json({ message: 'User ID not found' });
            }

            res.json(singleUser);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user' });
        }
    },

    async addNewUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
           
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'User creation failed' });
        }
    },

    async modifyUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updatedUser) {
                res.status(404).json({ message: 'Update failed: User not found' });
            }

            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Error updating user' });
        }
    },

    async eraseUser(req, res) {
        try {
            const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

            if (!deletedUser) {
                res.status(404).json({ message: 'Deletion failed: User not found' });
                return;
            }

            await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
            res.json({ message: 'User successfully removed' });

        } catch (error) {
            res.status(500).json({ message: 'Error deleting user' });
        }
    },

    async appendFriend(req, res) {
        try {
            const userWithNewFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!userWithNewFriend) {
                return res
                    .status(404)
                    .json({ message: 'Failed to add friend: User not found' });
            }

            res.json(userWithNewFriend);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error adding friend' });
        }
    },

    async detachFriend(req, res) {
        try {
            const userWithoutFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            if (!userWithoutFriend) {
                return res.status(404).json({
                    message: 'Failed to remove friend: User not found',
                });
            }

            res.json({ message: 'Friend successfully detached' });
        } catch (error) {
            res.status(500).json({ message: 'Error removing friend' });
        }
    },

};
