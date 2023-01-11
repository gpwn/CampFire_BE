const LikesService = require('../services/likes.service.js');

class LikesController {
    constructor() {
        this.likesService = new LikesService();
    }

    changeLike = async (req, res, next) => {
        try {
            const { campId } = req.params;
            // const { userId } = res.locals;
            const userId = 1;

            const message = await this.likesService.changeLike(campId, userId);

            res.status(201).json({
                message,
                campId,
                userId,
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = LikesController;
