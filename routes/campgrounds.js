const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');


const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))

    //新增送出
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.creatCampground));


//新增
router.get('/new', isLoggedIn, campgrounds.renderNewform);


router.route('/:id')
    //詳細頁
    .get(catchAsync(campgrounds.showCampground))

    //修改送出，回到詳細頁(show)
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))

    //刪除，回到總覽
    .delete(isLoggedIn, catchAsync(campgrounds.deleteCampground))










//修改
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))







module.exports = router;