import Movie from "../models/movieModel.js";

export const getAllMovies = async (req, res) => {
  try {
    const userId = req.user.id;

    const movies = await Movie.findAll({
      where: {
        userId: userId,
      },
    });

    res.json({
        success: true,
        message: "fetched all movies",
        data: movies,
      });
  } catch (err) {
    console.error("Error fetching movies:", err);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

export const createMovie = async (req, res) => {
  try {
    // console.log("Request body:", req.body);
    // console.log("Request file:", req.file);
    const userId = req.user.id;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User is not available",
      });
    }
    const image = req.file;
    const { title, director, budget, location, runtime, year, type } = req.body;

    const imageUrl = image ? image.path : null;
    const movie = await Movie.create({
      title,
      director,
      type,
      budget,
      location,
      duration: runtime,
      year,
      userId,
      poster: imageUrl,
    });
    res
      .status(201)
      .json({
        success: true,
        message: "New movie added sussefully",
        data: movie,
      });
  } catch (err) {
    res.status(500).json({ error: "Failed to create movie" });
  }
};

export const getSpecificMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.json({
      success: true,
      message: "Movie fetched successfully",
      data: movie,
    });
  } catch (err) {
    console.error("Error fetching movie:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch the movie",
    });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const movie = await Movie.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found or unauthorized",
      });
    }

    await movie.destroy();

    res.json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting movie:", err);
    res.status(500).json({ error: "Failed to delete movie" });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const movie = await Movie.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found or unauthorized",
      });
    }

    const image = req.file;
    const { title, director, budget, location, runtime, year, type } = req.body;

    const updatedMovie = await movie.update({
      title,
      director,
      type,
      budget,
      location,
      duration: runtime,
      year,
      poster: image ? image.path : movie.poster,
    });

    res.json({
      success: true,
      message: "Movie updated successfully",
      data: updatedMovie,
    });
  } catch (err) {
    console.error("Error updating movie:", err);
    res.status(500).json({ error: "Failed to update movie" });
  }
};
