const IdService = require("../../../services/unique-id/IdService");
const { ObjectId } = require('mongodb');

exports.getAUser = async (UserModalRepository,phoneNumber) => {
    try{
        const user = await UserModalRepository.findOne({phone_number:phoneNumber},"wallet");
        return user;
    }
    catch(err){
        return err;
    }
}

