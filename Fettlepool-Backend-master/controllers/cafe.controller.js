const {
    create_category,
    add_item,
    get_all_categories,
    delete_item,
    add_bestseller,
    remove_bestseller,
    edit_price,
    change_image
} = require('../services/cafe.service')


const create_category_controller = async (req, res, next) => {     
    const data = req.body["data"]
    const new_category = await create_category(data)
    if (new_category != null) {
        res.json({
            "message": "Category created successfuly",
            "status": 200
        })
    } else {
        res.status(500)
        res.json({
            "message": "Error registering category",
            "status": 500
        })
    }
}

const upload_cafe_image_controller = async (req, res, next) => {     
    
    if (req.file.path!= null) {
        res.json({
            "image": req.file.path,
            "status": 200
        })
    } else {
        res.status(500)
        res.json({
            "image": "Error registering image",
            "status": 500
        })
    }
}

const get_all_categories_controller = async (req, res, next) => { 
    const categoryData = await get_all_categories()
    if (categoryData != null) {
        res.status(200).json(categoryData)
    } else {
        res.status(404)
        res.json({
            "message": "No Data found",
            "status": 404
        })
    }
}

const add_item_controller = async (req, res, next) => {  
    const categoryId = req.body["categoryId"]
    const itemName = req.body["itemName"]
    const itemPrice = req.body["itemPrice"]
    const itemImage = req.body["itemImage"]
    const itemDescription = req.body["itemDescription"]
    const new_item = await add_item(categoryId,itemName,itemImage,itemPrice,itemDescription)
    if (new_item != null) {
        res.json({
            "message": "Item Added Successfully ",
            "status": 200
        })
    } else {
        res.status(500)
        res.json({
            "message": "Error adding Item.",
            "status": 500
        })
    }
}


const delete_item_controller = async (req, res, next) => {  
    const categoryId = req.body["categoryId"]
    const itemId = req.body["itemId"]
    const new_menu = await delete_item(categoryId,itemId)
    if (new_menu != null) {
        res.json({
            "message": "Item Deleted Successfully ",
            "status": 200
        })
    } else {
        res.status(500)
        res.json({
            "message": "Error deleting Item.",
            "status": 500
        })
    }
}

const add_bestseller_controller = async (req, res, next) => {  
    const categoryId = req.body["categoryId"]
    const itemId = req.body["itemId"]
    const new_menu = await add_bestseller(categoryId,itemId)
    if (new_menu != null) {
        res.json({
            "message": "Item edited Successfully ",
            "status": 200
        })
    } else {
        res.status(500)
        res.json({
            "message": "Error editing Item.",
            "status": 500
        })
    }
}


const edit_price_controller = async (req, res, next) => {  
    const categoryId = req.body["categoryId"]
    const itemId = req.body["itemId"]
    const newPrice = req.body["newPrice"]
    const new_menu = await edit_price(categoryId,itemId,newPrice)
    if (new_menu != null) {
        res.json({
            "message": "Item edited Successfully ",
            "status": 200
        })
    } else {
        res.status(500)
        res.json({
            "message": "Error editing Item.",
            "status": 500
        })
    }
}

const change_image_controller = async (req, res) => {
    const categoryId = req.body["categoryId"]
    const itemId = req.body["itemId"]
    const newImage = req.body["image"]
    const new_menu = await change_image(categoryId, itemId, newImage)
    if (new_menu != null) {
        res.json({
            "message": "Item edited Successfully ",
            "status": 200
        })
    } else {
        res.status(500)
        res.json({
            "message": "Error editing Item.",
            "status": 500
        })
    }
}

const remove_bestseller_controller = async (req, res, next) => {  
    const categoryId = req.body["categoryId"]
    const itemId = req.body["itemId"]
    const new_menu = await remove_bestseller(categoryId,itemId)
    if (new_menu != null) {
        res.json({
            "message": "Item edited Successfully ",
            "status": 200
        })
    } else {
        res.status(500)
        res.json({
            "message": "Error editing Item.",
            "status": 500
        })
    }
}

module.exports = {
    create_category_route: create_category_controller,
    add_item_route: add_item_controller,
    get_all_categories_route: get_all_categories_controller,
    upload_cafe_image: upload_cafe_image_controller,
    delete_item_route: delete_item_controller,
    add_bestseller_route: add_bestseller_controller,
    remove_bestseller_route: remove_bestseller_controller,
    edit_price_route:edit_price_controller,
    change_image_route:change_image_controller
}