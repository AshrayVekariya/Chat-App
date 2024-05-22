
const successResponse = (res, params = null) => {
    const response = { isSuccess: true, status: 200 }
    if (params) Object.keys(params).map((item) => (response[item] = params[item]))
    
    return res.status(200).json(response)
}

const badRequestResponse = (res, params = null) => {
    const response = { isSuccess: false, status: 400 }
    if (params)  Object.keys(params).map((item) => (response[item] = params[item]))

    return res.status(400).json(response)
}

const existsResponse = (res, params = null) => {
    const response = { isSuccess: false, status: 403 }
    if (params)  Object.keys(params).map((item) => (response[item] = params[item]))

    return res.status(403).json(response)
}

module.exports = {
    successResponse,
    badRequestResponse,
    existsResponse
}