const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");
function generateLargeTimestamp() {
    const now = new Date();

    // 각 구성 요소를 두 자리 형식으로 변환
    const year = now.getFullYear();                // 4자리 연도
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 월 (0~11, 1부터 시작)
    const day = String(now.getDate()).padStart(2, '0');        // 날짜
    const hours = String(now.getHours()).padStart(2, '0');     // 시간
    const minutes = String(now.getMinutes()).padStart(2, '0');// 분
    const seconds = String(now.getSeconds()).padStart(2, '0');// 초

    // 포맷팅된 시간 문자열 생성
    const largeNumber = `${year}${month}${day}${hours}${minutes}${seconds}.0`;
    const largeNumberFloat = parseFloat(largeNumber);
    return largeNumberFloat;
}
/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
// exports.getTest = async function (req, res) {
//     return res.send(response(baseResponse.SUCCESS))
// }






/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const { spawn } = require('child_process');
exports.postUsers = async function (req, res) {
    const { image_id, image_url } = req.body;

    // 빈 값 체크
    if (!image_id)
        return res.send({ message: 'Image ID is required' });
    if (!image_url)
        return res.send({ message: 'Image URL is required' });

    try {
        // 이미지 저장 디렉토리 설정
        const directoryPath = path.join(__dirname, 'images');
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath); // 디렉토리 없으면 생성
        }

        // 이미지 파일 이름 설정 (확장자는 고정: .jpg)
        const imagePath = path.join(directoryPath, `${image_id}.jpg`);
        console.log(imagePath);
        // 이미지 다운로드 및 저장
        const response = await axios({
            url: image_url,
            method: 'GET',
            responseType: 'stream',
        });

        const writer = fs.createWriteStream(imagePath);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
        console.log(generateLargeTimestamp())
        // 이미지가 저장된 이후에 userService 호출
        console.log(image_id);
        const imageIdInt = parseInt(image_id, 10); // 10은 10진수를 의미
        console.log(imageIdInt % 2);

        const python2 = spawn('python3', ['src/app/User/helloworld.py', imageIdInt % 2]);


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //블록체인 코드가 들어갈 위치.////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //generateLargeTimestamp()로 생성된 R이 블록체인 코드의 입력으로 들어가서 가상의 블록체인에 저장되는 것임.
        //
        //generateLargeTimestamp() -> 이것이 R을 생성하는 함수
        //R은 float 형으로 생성됨.





























        
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 실제로는 돌릴 때는 바로 아래 코드 주석 해제하면 됩니다. ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //const python = spawn('python3', ['src/app/User/realdeploy.py', generateLargeTimestamp()]); ////////////////////////////////////////////////////////////////////////////////////
        
        
        let pythonOutput = ''; // Python 출력 데이터를 저장할 변수 이거는 어떤 상황에서도 주석으로 처리하면 안 됨.

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 실제로는 여기서부터 주석 해제하면 됩니다.
        // Python 스크립트의 stdout 이벤트 처리
        //
        /*
        python.stdout.on('data', (data) => {
            pythonOutput += data.toString(); // 데이터를 문자열로 변환 후 변수에 추가
        });
        python.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
        
        python.on('close', async (code) => {
            if (code === 0) {
                console.log('Python script executed successfully.');
                console.log(`Python Output: ${pythonOutput}`);
        
                // Python 출력 데이터를 파일에 저장
                const fs = require('fs');
                fs.writeFileSync('./output.txt', pythonOutput, 'utf-8');
                console.log('Python output saved to output.txt');

                const signUpResponse = await userService.createUser(
                    image_id,
                    image_url
                );
        
                // 성공 응답 반환
                return res.send({
                    message: 'Image successfully saved and user created',
                    result: pythonOutput,
                    signUpResponse,
                });

            } else {
                console.error(`Python script exited with code ${code}`);
                return res.status(500).send({
                    message: 'Python script failed',
                    error: `Exit code: ${code}`,
                });
            }
        });*/
        //여기까지 주석 해제하면 됩니다.
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        ///* //실제로 돌릴 때는 여기서부터 주석 처리하면 됩니다.

                
        python2.stdout.on('data', (data) => {
            pythonOutput += data.toString(); // 데이터를 문자열로 변환 후 변수에 추가
        });


        python2.on('close', async (code) => {
            if (code === 0) {
                // Python 프로세스가 성공적으로 종료된 경우
                const signUpResponse = await userService.createUser(
                    image_id,
                    image_url
                );
        
                return res.send({
                    message: 'Image successfully classified',
                    image: image_id,
                    result: pythonOutput, // Python 출력 결과
                    signUpResponse,
                });



            } else {
                // Python 프로세스가 실패한 경우
                return res.status(500).send({
                    message: 'Python script failed',
                    error: `Exit code: ${code}`,
                });
            }
        });//*/ //실제로 돌릴 때는 여기서까지 주석 처리하면 됩니다.

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send({
            message: 'Failed to save image or create user',
            error: error.message,
        });
    }

};






/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
exports.getUsers = async function (req, res) {

    /**
     * Query String: email
     */
    //return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    const image_id = req.query.image_id;

    if (!image_id) {
        // 유저 전체 조회
        
        return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
        return res.send(response(baseResponse.SUCCESS, userListResult));
    } else {
        // 유저 검색 조회
        const userListResult = await userProvider.retrieveUserList(image_id);
        return res.send(response(baseResponse.SUCCESS, userListResult));
    }
};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getUserById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const userByUserId = await userProvider.retrieveUser(userId);
    return res.send(response(baseResponse.SUCCESS, userByUserId));
};


// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {email, password} = req.body;

    // TODO: email, password 형식적 Validation

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};


/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
exports.patchUsers = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const nickname = req.body.nickname;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUserInfo = await userService.editUser(userId, nickname)
        return res.send(editUserInfo);
    }
};











/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
