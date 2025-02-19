const { theme, author,category } = require("../model/model");
const categoryCon = {
  // add
  addcategory: async (req, res) => {
    try {
      const newcategory = new category(req.body);
      const savecategory = await newcategory.save();
      if (req.body.author) {
        const authorData = await author.findById(req.body.author);
        if (authorData) {
          authorData.category.push(savecategory._id);
          await authorData.save();
        } else {
          // Xử lý trường hợp không tìm thấy tác giả
        }
      }
      res.status(200).json(savecategory);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllcategory: async (req, res) => {
    try {
      //res.status(401).json({ error: 'Not authoried!!' });
      const categorys = await category.find();
      res.status(200).json(categorys);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAncategory: async (req, res) => {
    try {
      const categorys = await category.findById(req.params.id);
      res.status(200).json(categorys);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updatecategory: async (req, res) => {
    try {
      // Sử dụng `findByIdAndUpdate` để giảm số lượng truy vấn
      const updatedCategory = await category.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } // Trả về đối tượng đã cập nhật
      );

      // Kiểm tra nếu không tìm thấy danh mục
      if (!updatedCategory) {
        return res.status(404).json("Danh mục không tồn tại!");
      }

      res.status(200).json("Cập nhật thành công !!!");
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
      res.status(500).json("Đã xảy ra lỗi khi cập nhật danh mục");
    }
  },

  deletecategory: async (req, res) => {
    try {
      // Xóa tham chiếu đến category trong product
      // await author.updateMany(
      //   { category: req.params.id },
      //   { $pull: { category: req.params.id } }
      // );
      // Xóa category theo ID
      await category.findByIdAndDelete(req.params.id);

      res.status(200).json("Xóa thành công !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = categoryCon;
