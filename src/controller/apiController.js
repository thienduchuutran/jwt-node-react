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
    console.log('check', req.body)
}

module.exports = {
    testApi, handleRegister
}