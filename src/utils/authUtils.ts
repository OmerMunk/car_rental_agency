import jwt from "jsonwebtoken";

export const generateToken = (user: any) => {
    const payload = {
        sub: user.id,
        role: user.role,
        iss: 'car-rental-agencyISS',
        aud: 'car-rental-agencyAUD',
    };

    const token = jwt.sign(payload, 'SECRET_KEY', {expiresIn: '1h'});
    return token;
}
