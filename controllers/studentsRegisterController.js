const userData = {
   user : require('../data/register.json'),
   setUser : function (data) {this.user = data}
};
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');



const registerNewUser = async (req , res) =>{
        const {name , password} = req.body;

        if(!name || !password) return res.status(400).json({'message' : 'Username and Password are required'});

        const duplicate = userData.user.find( user => user.name ===name);
        if (duplicate) return res.sendStatus(409);//conflict
        try{
         const hashpassword = await bcrypt.hash(password , 10);
         const newUser = {
                id :userData.user[userData.user.length - 1] ?  userData.user[userData.user.length - 1].id + 1 : 1,
                name : name,
                password : hashpassword
        }
        userData.setUser([...userData.user, newUser]);
         await fsPromises.writeFile(path.join(__dirname , '..' , 'data' ,'register.json'),JSON.stringify(userData.user));
         res.status(201).json({ 'Success' : `The Student ${name}`})
         console.log(userData.user);
        }catch(err){
                res.status(500).json({'message' : err.message})
        }

}


module.exports = registerNewUser