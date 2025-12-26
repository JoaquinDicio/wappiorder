function checkMissingFields<T extends Record<string, any>>(requiredFields: (keyof T)[], data: T) {

    const error: Partial<Record<keyof T, string>> = {} //

    requiredFields.forEach(field => {
        if (data[field]?.toString().trim() === "" || !data[field]) error[field] = 'Este dato es obligatorio'
    })

    return error
}

export default checkMissingFields