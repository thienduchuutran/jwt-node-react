import loginRegisterService from '../service/loginRegisterService'

const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'testapi'
    })
}

const handleRegister = async (req, res) => {
    try {
        if(!req.body.email || !req.body.password || !req.body.phone){
            return res.status(200).json({
                EM: 'Missing required params',
                EC: '1',
                DT: ''                
            })
        }

        if(!req.body.password || req.body.password.length < 4){
            return res.status(200).json({
                EM: 'Password must have more than 4 characters',
                EC: '1',
                DT: ''                
            })
        }

        //service: create user
        let data = await loginRegisterService.registerUser(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''                
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })        
    }
}

const handleLogin = async(req, res) => {
    try {
        let data = await loginRegisterService.handleUserLogin(req.body)
        console.log(data)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

module.exports = {
    testApi, handleRegister, handleLogin
}