import ClientProject from "../models/client.js";

/* =========================
   📥 GET 1: Clients WITHOUT testimonials
   (for adding)
========================= */
export const getClientsWithoutTestimonials = async (req, res) => {
  try {
    const clients = await ClientProject.find({
      $or: [
        { rating: null },
        { feedback: null }
      ]
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      clients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   📥 GET 2: Clients WITH testimonials
   (for editing)
========================= */
export const getClientsWithTestimonials = async (req, res) => {
  try {
    const clients = await ClientProject.find({
        rating: { $ne: null },
        feedback: { $ne: null }
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      clients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   ➕ ADD Testimonial
========================= */
export const addTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const { rating, feedback } = req.body;

    const project = await ClientProject.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Client project not found"
      });
    }

    project.rating = rating;
    project.feedback = feedback;
    await project.save();

    res.json({
      success: true,
      message: "Testimonial added successfully",
      project
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   ✏️ EDIT Testimonial
========================= */
export const editTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, feedback } = req.body;

    const project = await ClientProject.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Client project not found"
      });
    }

    if (rating !== undefined) project.rating = rating;
    if (feedback !== undefined) project.feedback = feedback;

    await project.save();

    res.json({
      success: true,
      message: "Testimonial updated successfully",
      project
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   🗑️ DELETE Testimonial
========================= */
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await ClientProject.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Client project not found"
      });
    }

    project.rating = null;
    project.feedback = null;

    await project.save();

    res.json({
      success: true,
      message: "Testimonial deleted successfully",
      project
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
