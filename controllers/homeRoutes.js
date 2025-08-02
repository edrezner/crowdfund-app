const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Project, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const allProjects = projectData.map((project) =>
      project.get({ plain: true })
    );

    res.render("homepage", {
      projects: allProjects,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/project/:id", async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    if (!projectData) {
      return res.status(404).json({ message: "No project found." });
    }

    const selectedProject = projectData.get({ plain: true });

    selectedProject.progressPercent = Math.min(
      Math.round(
        (selectedProject.funded_amount / selectedProject.funding_goal) * 100
      ),
      100
    );

    res.render("project", {
      ...selectedProject,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Project,
        },
      ],
    });

    if (!userData) {
      res.status(404).json({ message: "User not found." });
    }

    const userProfile = userData.get({ plain: true });

    res.render("profile", {
      ...userProfile,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    return res.redirect("/profile");
  }

  res.render("login");
});

module.exports = router;
