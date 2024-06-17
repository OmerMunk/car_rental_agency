import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const generateKeyPair = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });


    const keyDir = path.join(__dirname, '../../__mock_keys__');
    if (!fs.existsSync(keyDir)){
        fs.mkdirSync(keyDir);
    }

    fs.writeFileSync(path.join(keyDir, 'dbPublicKey.pem'), publicKey);
    fs.writeFileSync(path.join(keyDir, 'dbPrivateKey.pem'), privateKey);
};

generateKeyPair();
console.log('Keys generated successfully!');
