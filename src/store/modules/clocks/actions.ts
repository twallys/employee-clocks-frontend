export function isButtonDisabled(bool: boolean) {
    return {
        type: 'IS_BUTTON_DISABLED',
        payload: bool
    }
}

export function setIsError(bool: boolean) {
    return {
        type: 'SET_IS_ERROR',
        payload: bool
    }
}