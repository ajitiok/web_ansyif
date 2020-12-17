const { Image } = require('../models')


class ImageController {

    static findAll ( req , res , next ){
        Image.findAll()
            .then(image => {
                res.status(200).json(image)
            })
            .catch(err => {
                next(err)
            })
    }

    static create ( req, res , next ){
        
        
        const { title , img_url , price , describe, tag } = req.body
      

        Image.create({
            title ,
            img_url ,
            price,
            describe,
            tag,
            UserId : req.userData.id
        })
        .then(image => {
            res.status(201).json({
                title : image.id,
                img_url : image.img_url,
                price : image.price,
                describe : image.describe,
                tag : image.tag,
                UserId : image.UserId
            })  
        })
        .catch(err => {
            next(err)
        })
    }


    static update(req, res , next){
        const { title , img_url , price , describe , tag , UserId } = req.body
        const { id } = req.params 
        
        Image.findByPk(id)
            .then(image => {
                if ( !image ) throw { msg : "Image not Found"}
                return image.update({title, img_url, price, describe ,tag })
            })
            .then(data => {
                res.status(200).json({
                    id : data.id,
                    title : data.title,
                    img_url : data.img_url,
                    price : data.price,
                    describe : data.describe,
                    tag : data.tag,
                    UserId : data.UserId
                })
            })
            .catch(err => {
                next(err)
            })
    }


    static delete ( req, res , next ){
        const { id } = req.params 

        Image.destroy({
                where : {id}
            })
            .then(image => {
                if (!image) throw { msg : `Image with ${id} not found`}
                else {
                    res.status(200).json({
                        msg : `Image with id : ${id} success deleted`
                    })
                }
            })
            .catch(err=> {
                next(err)
            })
    }

}

module.exports = ImageController

