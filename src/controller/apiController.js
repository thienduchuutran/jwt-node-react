const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'testapi'
    })
}

module.exports = {
    testApi
}