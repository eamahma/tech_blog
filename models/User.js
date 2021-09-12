// set up imports

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

//Set up object
class User extends Model {
  //check passwords
  checkPassword(loginPw) {
    // method
    return bcrypt.compareSync(loginPw, this.password); // compare plaintextPassword with hased personal password
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
     type: DataTypes.STRING,
     allowNull: false,
      

     //validate: {
     // notNull: { args: true, msg: "You must enter a name" }
    //},
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // Validate if it is a valid email
      validate: { isEmail: true },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      //make sure password has to be at least 3 char
      validate: { len: [3] },
    },
  },

  {
   
    hooks: {
      //set up beforeCreate lifecycle hooks functionality
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      //when we send in an update command
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    }, //for bcrypt
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
   
    timestamps: false,
    
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: "user",
  }
);

module.exports = User;
