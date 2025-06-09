const Blogs = require("../models/Blogs");
const uploadMedia = require("../utils/uploadMedia");

const uploadBlog = async (req, res) => {
  try {
    console.log("incoming")
    const { title, published, author, category, description } = req.body;

    const file = req.files.img[0];

    const img_url = await uploadMedia(file);
    await Blogs.create({
      title,
      published,
      author,
      category,
      description,
      img_url,
    });

    return res
      .status(201)
      .json({ success: true, msg: "Blog uploaded successfully" });
  } catch (err) {
    console.log(err.message);
    return res
      .status(501)
      .json({
        success: false,
        msg: "Some error occured please try again later",
      });
  }
};



const uploadExistingBlog = async (req, res) => {
  try {
    const { blogs } = req.body;
    await Promise.all(
      blogs.map(async (blog)=> {
        await Blogs.create({
          title:blog.title,
          published:blog.published,
          author:blog.author,
          category:blog.category,
          description:blog.description,
          img_url:blog.img_url
        });
      })
    );
    return res.status(201).json({success:true, msg:"All the blogs are now uploaded"});
  } 
  catch(err) {
    console.log(err.message);
    return res.status(501).json({success:false, msg:"Some error occured please try again later"});
  }
}

const getBlogs = async(req, res) => {
  try{
    const blogs = await Blogs.find();
    return res.status(200).json({success:true, msg:"Blogs incoming", blogs:blogs});
  }
  catch(err) {
    console.log(err.message);
    return res.status(501).json({success:false,msg:"Some error occured please try again later"});
  }
}
module.exports = { uploadBlog,uploadExistingBlog,getBlogs };
