
const notFoundResponse = (res, params = null) => {
    return res.status(404).json({
        isSuccess: false,
        status: 404,
        message: params.message
    })
}

module.exports = { notFoundResponse }