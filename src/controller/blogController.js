
//fx to create a new blog
const createBlog = async (req, res) => {
    try {
        const {title, description, body, tags} = req.body;
        const {id} = req.user;
        const user = await users.findById(id);
        const author = `${user.firstName} ${user.lastName}`;
        const newBlog = new blogs({title,description,author,tags,user:user._id});
        const blogPost = await newBlog.save();
        user.blog = user.blog.concat(blogPost._id);
        await user.save();
        res.status(200).json({blogPost});

    } catch (error) {
        res.status(500).json(error.message);
    }
};

//fx to get a blog by id
const getBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await blogs.findById(id).where({state: 'published'});
        if (!blog) {
            response.status(404).json("no blog found");
        }
        blog.readCount++;
        await blog.save();
        return response.status(200).json(blog);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

