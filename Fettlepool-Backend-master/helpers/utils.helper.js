const generate_unique_identifier = (count) => {
    var result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < count; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const calculate_expiry_days = (days) => {
    const now = new Date()
    now.setDate(now.getDate() + days)
    return new Date(now)
}

const check_scopes_existence = (current_scopes, requested_scope) => {
    if(current_scopes.indexOf(requested_scope) != -1){
        return true
    }
    return false
}

const base64decode = (data) => {
    return Buffer.from(data, "base64").toString("utf8")
}

const base64encode = (data) => {
    return new (Buffer.from(data)).toString("base64")
}

const create_S256_ecryption = (data) => {
    return crypto.createHash("sha256").update(data).digest("hex")
}

module.exports = {
    generate_unique_identifier,
    calculate_expiry_days,
    check_scopes_existence,
    base64decode,
    base64encode,
    create_S256_ecryption
}