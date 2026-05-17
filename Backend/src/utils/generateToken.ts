import jwt from 'jsonwebtoken';

const generateToken = (id: string): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in .env file');
    }
    
    // 30 din ke liye token valid rahega
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

export default generateToken;
