const Users = require('../models/user.models')
const uuid = require('uuid')
const crypto = require('../users/utils/crypto')

const getAllUsers = async () => {
    const data = await Users.findAll()
    return data
}

const getUserById = async (id) => {
    const data = await Users.findOne({
        where: {
            id
        }
    })
    return data
}

const createUser = async (data) => {
    const newUser = await Users.create({
        id: uuid.v4(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: crypto.hashPassword(data.password),
        profileImage: data.profileImage,
    })

    return newUser
    
}

const updateUser = async(id, data) => {
    const result = await Users.update(data,{
        where: {
            id
        }
    })
    return result  
}

const deleteUser = async (id) => {
    const data = await Users.destroy({
        where: {
            id
        }
    })

    return data
    
}

const getUserByEmail = async (email) => {
    const data = await Users.findOne({
        where: {
            email:email
        }
    }) ;

    return data
    
} ;

const forgotPassword = async (data) => {
    const user = await Users.findOne({
        where: {
            email: data.email
        }
    }) ;

    if (user) {
         user.set({
        password: crypto.hashPassword(data.password)
        }) 
        await user.save()
        return user;
        
    }else{
       
        throw 'Email not exist'
    }

    
};

const uploadProfileImage= async (data) => {
    const user = await Users.findOne({
        where: {
            id: data.userId
        }
    })

    user.set({
        profileImage: `http://localhost:3009/public/${data.profileImage}`
    })

    user.save()

    return user.profileImage
} ;

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail,
    forgotPassword,
    uploadProfileImage
}

