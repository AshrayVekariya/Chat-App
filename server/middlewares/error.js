
const errorResponse = (res, error = null) => {
    return res.status(400).json({
        isSuccess: false,
        status: 400,
        message: error.message
    })
}

module.exports = { errorResponse }