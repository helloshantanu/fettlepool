const {
  get_all_card_transactions,
  get_all_user_transactions,
  get_transactions,
  get_all_transactions,
  make_transaction
} = require('../services/transactions.service')

const get_all_card_transactions_controller = async (req, res, next) => {
    const cardNo = req.headers["x-request-card"]
    const transactions = await get_all_card_transactions(cardNo)
    res.json(transactions)
}

const get_all_user_transactions_controller = async (req, res, next) => {
    const user = req.body["uId"]
    const transactions = await get_all_user_transactions(user)
    res.json(transactions)
}

const get_all_user_transactions_controller_for_user = async (req, res, next) => {
    const user = res.locals["user"]
    const transactions = await get_all_user_transactions(user)
    res.json(transactions)
}

const get_transactions_controller = async (req, res, next) => {
    const transactionId = req.params["transactionId"]
    const transactions = await get_transactions(transactionId)
    res.json(transactions)
}

const get_all_transactions_controller = async (req, res, next) => {
    const transactions = await get_all_transactions()
    res.json(transactions)
}


const create_transactions_controller = async (req, res, next) => {
    const userId= res.locals['user']
    const paymentId = req.body['paymentId']
    const cardNo = req.body['cardNo']
    const amount = req.body['amount']
    const transaction = await make_transaction(paymentId,userId,cardNo,amount)
    if(transaction==null)
    res.status(401).json({"message":"Unauthorized"})
    else
    res.status(200).json({"message":"Transaction Successfull"})
}

module.exports = {
    "get_all_card_transactions": get_all_card_transactions_controller,
    "get_all_user_transactions": get_all_user_transactions_controller,
    // "get_transactions": get_user_transactions_controller,
    // "get_user_transactions": get_all_transactions,
    "create_transactions": create_transactions_controller,
    "get_all_transactions": get_all_transactions_controller,
    "get_all_transactions_for_users": get_all_user_transactions_controller_for_user,
}