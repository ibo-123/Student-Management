const userData = {
   user : require('../data/register.json'),
   setUser : function (data) {this.user = data}
};
const bcrypt = require('bcrypt');
const fsProomises = require('fs').promises;
const path = require('path');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const handlLogin =async (req , res) =>{
      const {name , password } = req.body ;
      if(!name || !password) return res.status(400).json({'message' : "User Name and Password are required"});
      const find = userData.user.find(student => student.name === name);

      if(!find) return res.status(402);

      const match = await bcrypt.compare(password , find.password);
      if(match){
        const accessToken = jwt.sign(
                {"username" : find.name  },
               process.env.ACCESS_TOKEN_SECRET,
               {expiresIn : '50s'  }
        )
        const refreshToken  = jwt.sign(
                {"username" : find.name  },
               process.env.REFRESH_TOKEN_SECRET,
               {expiresIn : '1d'  }
        )
        const otherUsers = userData.user.filter( person => person.name !== find.name)
        const currentUser = {...find,refreshToken};
        userData.setUser([...otherUsers , currentUser])
        fsProomises.writeFile(path.join(__dirname , '..','data' ,'register.json' ) , 
                   JSON.stringify(userData.user)                     
                );
                res.json({accessToken});

        }else{
                res.status(401).JSON({"message" : "there is un error"});
        }

};

module.exports = handlLogin ;  