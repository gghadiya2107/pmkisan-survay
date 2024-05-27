// utils/encryption.js
import CryptoJS from 'crypto-js';

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY_ENCRYPT_DECRYPT;

// Encryption function
// export function encryptData(data) {
//     const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
//     const encryptedWithPlusSign = encodeURIComponent(encrypted);
//     return encryptedWithPlusSign;
// }

// Decryption function
// export function decryptData(encryptedData) {
//     const encryptedWithoutPlusSign = encodeURIComponent(encryptedData);
//     const bytes = CryptoJS.AES.decrypt(encryptedWithoutPlusSign, secretKey);
//     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
// }

export function decryptData(urlEncodedEncrypted) {

    try {
console.log('urlEncodedEncrypted', urlEncodedEncrypted)
        const bytes = CryptoJS.AES.decrypt(urlEncodedEncrypted, secretKey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        console.log("decrypted ac ", originalText);

        return JSON.parse(originalText);
    } catch (e) {
        console.log(e, "asjkbndjbhsadbjhasd");
    }
}

export function encryptData(employeeCode) {
    console.log('employeeCode', employeeCode)
    const encrypted = CryptoJS.AES.encrypt(employeeCode, secretKey).toString();

    console.log("Encrypted with char codes: ", encrypted);
    return encodeURIComponent(encrypted);
}

