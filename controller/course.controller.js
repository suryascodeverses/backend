const { Course } = require("../models");

exports.createCourse = async (req, res) => {
  try {
    const { title, description, categoryId, categoryTypeId, video } = req.body;

    const course = await Course.create({
      title,
      description,
      categoryId,
      categoryTypeId,
      video,
    });

    res.status(201).json({ success: true, data: course });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.bulkCreateCourses = async (req, res) => {
  try {
    const { courses } = req.body; // array of course objects
    const createdCourses = await Course.bulkCreate(courses);
    res.status(201).json({ success: true, data: createdCourses });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json({ success: true, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { title, description, categoryId, categoryTypeId, video } = req.body;

    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const updated = await course.update({
      title,
      description,
      categoryId,
      categoryTypeId,
      video,
    });

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
