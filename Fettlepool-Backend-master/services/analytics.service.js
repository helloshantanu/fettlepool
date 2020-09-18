const Users = require('../models/users.model')
const Admins = require('../models/admin.model')
const Logs = require('../models/logs.model')
const Analytics = require('../models/analytics.model')
const Transactions = require('../models/transaction.model')
const Cafe = require('../models/cafe.model')
const moment = require("moment");


const totalUsers = async () => {
    const users= await Users.find({});
    if(users.length>0){
        var length = users.length;
        return length;
    }
    else{
        return 0
    }
    
}

const totalRegisteredUsers = async () => {
    const users = await Users.find({ "state": { $ne: null } });
    if (users.length > 0) {
        var length = users.length;
        return length;
    }   
    else {
        return 0
    }
    
}

const totalAdmins = async () => {
    const admins = await Admins.find({});
    if (admins.length > 0) {
        var length = admins.length;
        return length;
    }
    else {
        return 0
    }
    
}

const totalMenuCategories = async () => {
    const menu= await Cafe.find({})
    if (menu.length > 0) {
        var length = menu.length;
        return length;
    }
    else {
        return 0
    }
    
}

const totalMenuItems = async () => {
    const menu = await Cafe.find({})
    if (menu.length > 0) {
        var length = menu.length;
        var c = 0;
        for (var i = 0; i < length; i++) {
            c = c + menu[i]['menu'].length;
        }
        return c;
    }
    else {
        return 0
    }
    
}

const totalSessions = async () => {
    const logs = await Logs.find({})
    if (logs.length > 0) {
        var length = logs.length;
        return length;
    }
    else {
        return 0
    }
    
}

const weeklyData = async () => {

        var ar1 = Array(8).fill(0)
        var ar2 = Array(8).fill(0)

        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        const docs = await Logs.find(
            { entryTime: { $gt: lastWeek } }
            );
        if(docs.length>0){
            var i = 1;
            for (i = 0; i < docs.length; i++) {
                var dayno = moment(docs[i]['entryTime']).isoWeekday();
                ar1[dayno] = ar1[dayno] + 1
                ar2[dayno] = ar2[dayno] + 50
            }
        }

        return({
            'weeklySessions':ar1,
            'weeklyEarning':ar2
        })
    
}

const totalTransactions = async () => {
    const transactions = await Transactions.aggregate([
        {
            $group:{
                _id:'',
                totalAmount:{$sum:"$amount"}
            }
        }
    ])
    if (transactions.length>0){
        var amount = transactions[0]['totalAmount'];
        return amount;
    }
    else
    return 0
    
}

const totalEarnings= async () => {
    const logs = await Logs.find({})
    if (logs.length > 0) {
        var length = logs.length;
        var amount = 50 * length;
        return amount;
    }
    else
        return 0
    
}


const saveAnalytics = async(users, usersRg, admins, menus, items, sessions, transactions, earnings, weeklySessions,weeklyEarnings) => {
    const new_analytic = new Analytics({
        users:users,
        regUsers:usersRg,
        admins:admins,
        menus:menus,
        items:items,
        sessions:sessions,
        transactions:transactions,
        earnings:earnings,
        curWeekSessions:weeklySessions,
        curWeekEarnings:weeklyEarnings        
    })
    const log = await new_analytic.save()
    return log
}


const get_all_analytics = async () => {
    return await Analytics.find({}).sort({ "createdOn": -1 }).limit(1)
}


module.exports = {
    totalAdmins,
    totalUsers,
    totalRegisteredUsers,
    totalMenuCategories,
    totalMenuItems,
    totalSessions,
    totalTransactions,
    totalEarnings,
    weeklyData,
    saveAnalytics,
    get_all_analytics
}