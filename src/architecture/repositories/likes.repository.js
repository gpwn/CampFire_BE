const { Likes, Users, Camps } = require('../../models');
const { Op } = require('sequelize');

class LikesRepository {
    #CampModel;
    #UserModel;
    #LikeModel;
    constructor(CampModel, UserModel, LikeModel) {
        this.#CampModel = CampModel;
        this.#UserModel = UserModel;
        this.#LikeModel = LikeModel;
    }

    findLike = async (campId, userId) => {
        return await this.#LikeModel.findOne({
            where: {
                [Op.and]: [{ campId, userId }],
            },
        });
    };

    addLike = async (campId, userId) => {
        return await this.#LikeModel.create({
            campId,
            userId,
        });
    };

    deleteLike = async (campId, userId) => {
        return await this.#LikeModel.destroy({
            where: {
                [Op.and]: [{ campId, userId }],
            },
        });
    };

    userLikeupdate = async (userId, userlike) => {
        await this.#UserModel.update(
            {
                likes: userlike,
            },
            { where: { userId } }
        );
    };

    campLikeupdate = async (campId, camplike) => {
        await this.#CampModel.update(
            {
                likes: camplike,
            },
            { where: { campId } }
        );
    };
}

module.exports = LikesRepository;
