import { Task } from "../modals/task.js";
import ErrorHandler from "../uils/errorHandler.js";

export const newATask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const task = new Task({ title, description, user: req.user });
    await task.save();

    res.status(201).json({
      success: true,
      message: "task added succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export const myTask = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const task = await Task.find({ user: userId });

    res.status(200).json({
      success: true,
      task: [...task],
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) return next(new ErrorHandler("_id didnt found", 404));

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "task updated",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("_id didnt found", 404));

    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "task deleted",
    });
  } catch (error) {
    next(error);
  }
};
