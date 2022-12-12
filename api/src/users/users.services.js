const usersControllers = require('./users.controllers')

const getAllUsers =  (req, res) => {
    usersControllers.getAllUsers()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
    
};

const getUserById = (req, res) => {
    const id = req.params.id ;

    usersControllers.getUserById(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(404).json({message: err.message})
        })
    
} ;

const patchUser = (req, res) => {
    const id = req.params.id;
        
    const {firstName, lastName,profileImage } = req.body ;

    usersControllers.updateUser(id, {firstName, lastName,profileImage})
        .then(data => {
            if (data[0]) {
                res.status(200).json({message: `user with ID: ${id} edited succesfully`})
                
            }else{
                res.status(400).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
};

const deleteUser = (req, res) => {
    const id = req.params.id ;
    usersControllers.deleteUser(id)
        .then(data => {
            if (data) {
                res.status(204).json('User Deleted')
                
            } else {
                res.status(400).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})

        })
    
};

const registerUser =  (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    if (
        firstName &&
        lastName &&
        email &&
        password 
    ) {
        //? Ejecutamos el controller
        usersControllers.createUser({
            firstName, lastName, email, password
        })
            .then( data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    } else {
    //? Error cuando no mandan todos los datos necesarios para crear un usuario
        res.status(400).json({message: 'All fields must be completed', fields: {
            firstName: 'string',
            lastName: 'string',
            email: 'example@example.com',
            password: 'string',
            profileImage: "http://localhost:8080"
        }})
    }
    
};

//? My user services

const getMyUser = (req, res) => {
      const id = req.user.id ; // req.user contiene la informacion del token desencriptado 
        usersControllers.getUserById(id)
        .then( data => {
                res.status(200).json(data)
        } )
        .catch(err => {
            res.status(400).json({message: err.message})
        })
};

const updateMyUser = (req, res) => {
    const id = req.user.id;
    const {firstName, lastName,profileImage } = req.body ;

     usersControllers.updateUser(id, {firstName, lastName, profileImage})
        .then(data => {
            if (data[0]) {
                res.status(200).json({message: `user with ID: ${id} edited succesfully`})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
    
} ;

const deletMyUser = (req, res) => {
    const id = req.user.id ;
    usersControllers.updateUser(id)
        .then( () => {
            res.status(200).json({message: 'Your user was deletd succesfully'})
        } )
        .catch( err => {
            res.status(400).json({message: err.message})
        } )
        
} ;

const forgotPassword = (req, res) => {
    const {email, password} = req.body ;

    if (email && password) {
        usersControllers.forgotPassword({email, password})
            .then(response => {
                res.json({message: "Password modify correctly", response})
            })
            .catch(err => {
                res.json({message: err})
            })
        
    }else{
        res.status(400).json(
            {message: "Field missing", 
                field: {
                    email: "String",
                    password: "String"
                } })
    }
} ;

const postProfileImage = (req, res) => {
    const profileImage = req.file.filename ;
    const userId = req.user.id ;

    usersControllers.uploadProfileImage({profileImage, userId})
        .then( response => {
            res.status(201).json({message: response})
        } )
        .catch( err => {
            res.json({message: err.message})
        } )
} ;

module.exports = {
    getAllUsers,
    getUserById,
    patchUser,
    registerUser,
    deleteUser,
    getMyUser,
    updateMyUser,
    deletMyUser,
    forgotPassword,
    postProfileImage
}
