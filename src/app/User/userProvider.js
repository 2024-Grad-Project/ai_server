const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const {spawn} = require('child_process');

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveUserList = async function (image_id) {
  if (!image_id) {


    const connection = await pool.getConnection(async (conn) => conn);

    console.log("hi");
    const userListResult = await userDao.selectUserImageId(connection,image_id);
    console.log("hi2");
    //const result = spawn('python3', ['./python/helloworld.py']);
    //console.log("hi3");
    //result.stdout.on ('data',function (data){
    //  console.log ("in stodu");
    //  console.log (data.toString());
    //  print(`stdout : ${data}`);
    //  userListResult =data ;
    // });
    //console.log("hi4");
    connection.release();

    return userListResult;

  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUserImageId(connection, image_id);
    connection.release();

    return userListResult;
  }
};

exports.retrieveUser = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await userDao.selectUserId(connection, userId);

  connection.release();

  return userResult[0];
};

exports.emailCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  connection.release();

  return emailCheckResult;
};

exports.passwordCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPassword(
      connection,
      selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult[0];
};

exports.accountCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, email);
  connection.release();

  return userAccountResult;
};