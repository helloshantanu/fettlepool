const Transaction = require('../models/transaction.model')
const Cards = require('../models/card.model')

const axios=require('axios').default


const make_transaction = async (paymentId,userId,cardNo,amount) => {
    try{
        const userName  = process.env.RAZORPAY_USERNAME
        const password  = process.env.RAZORPAY_PASSWORD
       var response = await axios.get('https://api.razorpay.com/v1/payments/'+paymentId,
            {
                auth: {
                    username: userName,
                    password: password
                }
            });
        if(response.status==200){
            data=response.data;
            const status=data['status']
            const method=data['method']
            const description=data['description']
            const bank=data['bank']
            const createdAtRazorpay=data['created_at']
            const amountRazorpay=data['amount']/100
        
            const new_transaction_document = new Transaction({
                paymentId: paymentId,
                userId: userId,
                cardNo: cardNo,
                description: description,
                created_at_razorpay: createdAtRazorpay,
                status:status,
                method:method,
                bank:bank,
                amount: amountRazorpay,
            })
            const new_transaction = await new_transaction_document.save()

            const addMoney= await Cards.findOneAndUpdate({
                "cardNo": cardNo
            }, {
                $inc: {
                    balance: amountRazorpay
                }
            })
            return new_transaction
        }
        else{
            return null
        }
    }
    catch(err){
        return null
    }
    
}

const get_transactions = async (transactionId) => {
    return await Transaction.findOne({
        "_id": transactionId
    }).sort({ "created_at": -1 })
}

const get_all_transactions = async () => {
    return await Transaction.find({}).sort({ "created_at": -1 })
}

const get_all_user_transactions = async (userId) => {
    return await Transaction.find({
        "userId": userId
    }).sort({ "created_at": -1 })
}

const get_all_card_transactions = async (cardNo) => {
    return await Transaction.find({
        "cardNo": cardNo
    }).sort({ "created_at": -1 })
}

module.exports = {
    get_all_transactions,
    get_transactions,
    make_transaction,
    get_all_card_transactions,
    get_all_user_transactions
}