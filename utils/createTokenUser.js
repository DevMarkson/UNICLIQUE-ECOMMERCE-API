const createTokenUser = (user) => {
    return {name: user.name, userId: user._id, role: user.role, msg: 'Verification email sent'};
};

module.exports = createTokenUser;