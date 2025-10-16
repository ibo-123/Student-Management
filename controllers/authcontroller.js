const userData = {
   user : require('../data/register.json'),
   setUser : function (data) {this.user = data}
};
const bcrypt = require('bcrypt')

const handlLogin =async (req , res) =>{
      const {name , password } = req.body ;
      if(!name || !password) return res.status(400).json({'message' : "User Name and Password are required"});
      const find = userData.user.find(student => student.name === user);

      if(!find) return res.status(402);

      const match = await bcrypt.match(password , found.password);
      if(match){
                res.json({'success' : `User ${user} is Logged in!`});
        }else{
                res.sendStatus(401);
        }

};

module.exports = handlLogin ;  