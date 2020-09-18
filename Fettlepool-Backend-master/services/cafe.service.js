const Cafes = require('../models/cafe.model')

const create_category = async (data) => {
    var menuData = new Cafes(data);
    var response = await menuData.save();
    return response;
}

const get_all_categories = async () => {
    var response = await Cafes.find({})
    return response;
}

const add_item = async (categoryId, itemName, itemImage, itemPrice, itemDescription) => {
    var response = await Cafes.findOneAndUpdate({
        "_id": categoryId
    }, {
        $push: {
            menu: {
                $each: [{ 
                    "itemName":itemName, 
                    "itemImage":itemImage,
                    "itemPrice":itemPrice,
                    "itemDescription":itemDescription,
                }],
            }
        }
        
    })
    return response;
}

const delete_item = async (categoryId, itemId) => {
    var response = await Cafes.findOneAndUpdate({
        "_id": categoryId
    }, {
        $pull: {
            "menu": {"_id":itemId}
        }
        
    })
    return response;
}

const add_bestseller = async (categoryId, itemId) => {
    var response = await Cafes.findOneAndUpdate({
        "_id": categoryId,"menu._id":itemId
    }, {
        $set: {
            "menu.$.isBestSeller": true
        }
        
    })
    return response;
}

const remove_bestseller = async (categoryId, itemId) => {
    var response = await Cafes.findOneAndUpdate({
        "_id": categoryId,"menu._id":itemId
    }, {
        $set: {
            "menu.$.isBestSeller": false
        }
        
    })
    return response;
}

const edit_price = async (categoryId, itemId,newPrice) => {
    var response = await Cafes.findOneAndUpdate({
        "_id": categoryId, "menu._id": itemId
    }, {
        $set: {
            "menu.$.itemPrice": newPrice
        }

    })
    return response;
}

const change_image = async (categoryId, itemId, image) => {

    var response = await Cafes.findOneAndUpdate({
        "_id": categoryId, "menu._id": itemId
    }, {
        $set: {
            "menu.$.itemImage": image
        }

    })
    return response;
}

module.exports = {
    create_category,
    add_item,
    get_all_categories,
    delete_item,
    add_bestseller,
    remove_bestseller,
    edit_price,
    change_image
}