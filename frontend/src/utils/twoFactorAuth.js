export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const validateVerificationCode = (userCode, storedCode) => {
  return userCode === storedCode;
};

export const storeVerificationCode = async (userId, code, db) => {
  try {
    await db
      .collection("verificationCodes")
      .doc(userId)
      .set({
        code,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes expiry
      });
    return true;
  } catch (error) {
    console.error("Error storing verification code:", error);
    return false;
  }
};
