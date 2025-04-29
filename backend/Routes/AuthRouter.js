const { signup, login, googleLogin, order, getOrdersForDealer,updateBuyer,getOrdersByCustomerId,getOrdersByDealerId,hataorecord,getOrdersWithCount,updateRecord } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { ensureAuthenticated } = require('../Middlewares/Auth'); 
//const { getMaxListeners } = require('../Models/order');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post('/orders',order);
router.get('/orders/dealer', getOrdersForDealer);
router.put('/orders/accept/:orderId', updateBuyer);
router.get('/customer/:userId/orders', getOrdersByCustomerId);
router.get('/dealer/:userId/orders', getOrdersByDealerId);
router.delete('/customer/:orderId/delete',hataorecord);
router.get('/admin', getOrdersWithCount);
router.post('/google-login',googleLogin);
router.put('/update-profile',ensureAuthenticated,updateRecord);

router.get('/test', ensureAuthenticated, (req, res) => {
    res.json({
        message: 'You are authenticated!',
        user: req.user, 
        success: true
    });
});

module.exports = router;