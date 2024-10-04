
const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')

// Tạo post hay new post
const createNewBlog = asyncHandler(async (req, res) => {
    const {title, description, category} = req.body;
    if(!title || !description || !category) throw new Error('Missing inputs')
    const response = await Blog.create(req.body);
    return res.json({
        success: response ? true : false,
        createNewBlog: response ? response : 'Cannot create New Blog',
    });
});


// update blog
const updateBlog = asyncHandler(async (req, res) => {
    const {bid} = req.params;
    if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await Blog.findByIdAndUpdate(bid, req.body, {new: true});
    return res.json({
        success: response ? true : false,
        updateBlog: response ? response : 'Cannot updated Blog',
    });
});

// get blog
const getBlogs = asyncHandler(async (req, res) => {
    
    const response = await Blog.find();
    return res.json({
        success: response ? true : false,
        getBlog: response ? response : 'Cannot get Blog',
    });
});

// delete blog
const deleteBlog = asyncHandler(async(req, res) => {
    const {bid} = req.params
    const response = await Blog.findByIdAndDelete(bid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        rs: response ? response : 'Cannot Delete'
    })
})

// LIKE, DISLIKE
// Khi người dùng like 1 bài blog thì :
// 1. Check người dùng trước đó có dislike hay không => bỏ dislike 
// 2. Nếu không có dislike thì check xem người đó trước đó có like hay không => Nếu mà like thì bỏ like/ Thêm like

// like block
const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.params;
    if (!bid) throw new Error('Missing inputs');
    const blog = await Blog.findById(bid);
    const alreadyDisliked = blog?.disLikes?.find((el) => el.toString() === _id);
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(
            bid,
            {
                $pull: { disLikes: _id },
                isDisliked: false,
            },
            { new: true },
        );
        return res.json({
            success: response ? true : false,
            result: response,
        });
    }

    const isLiked = blog?.likes?.find((el) => el.toString() === _id);
    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(
            bid,
            { $pull: { likes: _id } },
            { new: true },
        );
        return res.json({
            success: response ? true : false,
            result: response,
        });
    } else {
        const response = await Blog.findByIdAndUpdate(
            bid,
            { $push: { likes: _id } },
            { new: true },
        );
        return res.json({
            success: response ? true : false,
            result: response,
        });
    }
});

const dislikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.params;
    if (!bid) throw new Error('Missing inputs');
    const blog = await Blog.findById(bid);
    const alreadyLiked = blog?.likes?.find((el) => el.toString() === _id);
    if (alreadyLiked) {
        const response = await Blog.findByIdAndUpdate(
            bid,
            {
                $pull: { likes: _id },
            },
            { new: true },
        );
        return res.json({
            success: response ? true : false,
            result: response,
        });
    }

    const isDisliked = blog?.disLikes?.find((el) => el.toString() === _id);
    if (isDisliked) {
        const response = await Blog.findByIdAndUpdate(
            bid,
            { $pull: { disLikes: _id } },
            { new: true },
        );
        return res.json({
            success: response ? true : false,
            result: response,
        });
    } else {
        const response = await Blog.findByIdAndUpdate(
            bid,
            { $push: { disLikes: _id } },
            { new: true },
        );
        return res.json({
            success: response ? true : false,
            result: response,
        });
    }
    
});

// get blog (có trường views (lượt xem )
// sử dụng populate để liên kết các bảng
// const excludedFields = '-refreshToken -password -role -createdAt -updatedAt' 
const getBlog = asyncHandler(async(req, res) => {
    const {bid} = req.params
    const response = await Blog.findByIdAndUpdate(bid, { $inc: {numberViews: 1}}, {new: true})
        .populate('likes', 'firstname lastname')
        .populate('disLikes', 'firstname lastname')
    return res.json({
        success: response ? true : false,
        rs: response
    })
})

const uploadImageBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (!req.file) throw new Error('No files');
    const response = await Blog.findByIdAndUpdate(
        bid,
        {
           image: req.file.path,
        },
        { new: true },
    );
    return res.status(200).json({
        status: response ? true : false,
        updatedBlog: response ? response : 'Cannot upload image',
    });
});

module.exports = {
    createNewBlog,
    updateBlog,
    getBlogs,
    likeBlog,
    dislikeBlog,
    deleteBlog,
    getBlog,
    uploadImageBlog
}