function handleErrorResponse(error) {
    if (error.response) {
        return {
            type: 'response',
            data: error.response.data,
            status: error.response.status,
            headers: error.response.headers,
        };
    } else if (error.request) {
        return {
            type: 'request',
            request: error.request,
        };
    } else {
        return {
            type: 'general',
            message: error.message,
        };
    }
}

export function handleError(e) {
    const error = handleErrorResponse(e);

    switch (error.type) {
        case 'response':
            console.error(`Error Response:\nData: ${error.data.message}\nStatus: ${error.status}\nHeaders: ${JSON.stringify(error.headers)}`);
            break;
        case 'request':
            console.error(`Error Request:\nRequest: ${error.request}`);
            break;
        case 'general':
            console.error(`General Error:\nMessage: ${error.message}`);
            break;
        default:
            console.error('Unknown Error Type:', error);
            break;
    }

    return error;
}
