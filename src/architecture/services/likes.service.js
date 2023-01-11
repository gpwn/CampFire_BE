const LikesRepository = require('../repositories/likes.repository.js');
const UsersRepository = require('../repositories/users.repository.js');
const CampsRepository = require('../repositories/camps.repository.js');
const {
    ValidationError,
    InvalidParamsError,
    ExistError,
} = require('../../middlewares/exceptions/error.class.js');
const {
    Books,
    Camps,
    Hosts,
    Users,
    Sites,
    CampAmenities,
    Envs,
    Types,
    Themes,
    Likes,
} = require('../../models');

class LikesService {
    constructor() {
        this.liksRepository = new LikesRepository();
    }
    usersRepository = new UsersRepository(Users);
    campsRepository = new CampsRepository(Books, Camps, Hosts, Users);

    changeLike = async (campId, userId) => {
        const findUser = await this.usersRepository.findOneUser(userId);
        const findCamps = await this.campsRepository.findCampById(campId);

        if (!findCamps) {
            throw new InvalidParamsError('찜할 수 없는 캠핑장입니다.', 400);
        }

        const findLike = await this.liksRepository.findLike(campId, userId);

        let userlike = Number(findUser.likes);
        let camplike = Number(findCamps.likes);
        let message = '';
        if (!findLike) {
            await this.liksRepository.addLike(campId, userId);
            userlike += Number(1);
            camplike += Number(1);
            message = '좋아요 성공!';
        } else {
            await this.liksRepository.deleteLike(campId, userId);
            userlike -= Number(1);
            camplike -= Number(1);
            message = '좋아요 취소!';
        }

        await this.liksRepository.userLikeupdate(userId, userlike);
        await this.liksRepository.campLikeupdate(campId, camplike);
        return message;
    };
}

module.exports = LikesService;