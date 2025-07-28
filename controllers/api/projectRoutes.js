const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Project } = require("../../models/");

router.post("/", withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const projectForDeletion = await Project.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!projectForDeletion) {
      return res.status(404).json({ message: "Project not found." });
    }

    if (projectForDeletion.user_id !== req.session.user_id) {
      return res.status(403).json({
        message: "You do not have permission to delete this project.",
      });
    }

    await projectForDeletion.destroy();

    res.status(200).json(projectForDeletion);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
