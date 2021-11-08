import bcrypt from "bcrypt";
import crypto from "crypto";

const SALT_ROUNDS = 10;

function hashSync(plainText) {
	return bcrypt.hashSync(plainText, SALT_ROUNDS);
}

// @TODO
function compare() {}

// @TODO
async function hash(plainText) {
	let res;
	try {
		res = await bcrypt.hash(plainText, SALT_ROUNDS);
		return res;
	} catch {
		return -1;
	}
}

// if you just need random numbers
function randomBytes() {
	return crypto.randomBytes(32);
}

export { hashSync, hash as default, randomBytes };
