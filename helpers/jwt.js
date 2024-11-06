const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: '12h',
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        ); // Aquí va la clave secreta
    });
};

module.exports = {
    generateJWT,
};
