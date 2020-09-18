const {
    totalAdmins,
    totalMenuCategories,
    totalMenuItems,
    totalRegisteredUsers,
    totalSessions,
    totalTransactions,
    totalUsers,
    totalEarnings,
    weeklyData,
    saveAnalytics,
    get_all_analytics
} = require('../services/analytics.service')

const dashboard_analytics_controller = async (req, res, next) => {
    try{
        const users = await totalUsers();
        const usersRg = await totalRegisteredUsers();
        const admins = await totalAdmins();
        const menus = await totalMenuCategories();
        const items = await totalMenuItems();
        const sessions = await totalSessions();
        const transactions = await totalTransactions();
        const earnings = await totalEarnings();
        res.status(200).json({
            "users": users,
            "usersRg": usersRg,
            "admins": admins,
            "menus": menus,
            "items": items,
            "sessions": sessions,
            "transactions": transactions,
            "earnings":earnings
        })
    }catch(err){
        console.log(err)
    }
    
}

const get_analytics_controller = async (req, res, next) => {
    try{
        const docs = await get_all_analytics()
        if(docs)
        res.status(200).json({"data":docs})
        else
        res.status(500).json({"message":"Server Error"})
    }catch(err){
        console.log(err)
    }
    
}

const weekly_analytics_scheduler = async (req, res, next) => {
    try{
        const users = await totalUsers();
        const usersRg = await totalRegisteredUsers();
        const admins = await totalAdmins();
        const menus = await totalMenuCategories();
        const items = await totalMenuItems();
        const sessions = await totalSessions();
        const transactions = await totalTransactions();
        const earnings = await totalEarnings();
        const weekData= await weeklyData();

        const docs=await saveAnalytics(users,usersRg,admins,menus,items,sessions,transactions,earnings,weekData['weeklySessions'],weekData['weeklyEarning'])

        if(docs)
        res.status(200).json({
            "message": "Analytics saved successfully",
        })
        else
        res.status(500).json({
            "message": "Analytics saved successfully",
        })

    }catch(err){
        console.log(err)
    }
    
}



module.exports = {
    dashboard_analytics: dashboard_analytics_controller,
    get_analytics: get_analytics_controller,
    weekly_analytics: weekly_analytics_scheduler,
}