
export function randomId () {
    let charset = '0123456789';
    let password = '';

    for(var i = 0, n = charset.length; i < 10; ++i){
        password += charset.charAt( Math.floor( Math.random() * n ))
    };

    return Number(password);
}