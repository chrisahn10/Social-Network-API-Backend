const { Thought, User } = require('../models');


module.exports = {
    async GetAllThoughts(req, res) {
        try {
            const GetAllThoughts = await Thought.find();
            res.json(GetAllThoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async GetSingleThought(req, res) {
        try {
            const GetSingleThought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!GetSingleThought) {
                return res.status(404).json({ message: 'There is no Thought with that ID' });
            }

            res.json(GetSingleThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThoughts(req, res) {
        try {
            const createThoughts = await Thought.create(req.body);
            const user = await User.findById(req.body.userId);
            user.thoughts.push(createThoughts);
            await user.save();

            res.json(createThoughts);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {

            const UpdateThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId, userId: req.body._id }, 
                { $set: req.body },
                { new: true }

            );
            console.log(req)
            if (!UpdateThought) {
                res.status(404).json({ message: 'There is no Thought with that ID!' });
            }
            res.json(UpdateThought);
        } catch (err) {
            console.log(err + "updatethought error")
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const deleteThought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId, userId: req.params.userId }
            );
    
            if (!deleteThought) {
                return res.status(404).json({ message: 'There is no Thought with that ID' });
            }
    
            const findUser = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
    
            if (!findUser) {
                return res.status(404).json({
                    message: 'No User found for that Thought',
                });
            }
    
            res.json({ message: 'Thought has been deleted' });
        } catch (err) {
            console.log('Error in deleteThought:', err);
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        try {
            const createReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!createReaction) {
                return res
                    .status(404)
                    .json({ message: 'There is no reaction with that ID' });
            }
            res.json(createReaction);
        } catch (err) {

            res.status(500).json(err);
        }
    },
    async removeReaction(req, res) {
        try {

            const RemoveReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!RemoveReaction) {
                return res
                  .status(404)
                  .json({ message: 'There is no thought with that ID' });
              }

            res.json({ message: 'Reaction has been deleted' });
        } catch (err) {

            res.status(500).json(err);
        }
    },
};