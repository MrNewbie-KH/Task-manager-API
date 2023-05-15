const TASK = require("../model/model");

// ======
const getAllTasks = async function (req, res) {
  try {
    const allTasks = await TASK.find({});
    res.status(200).json({ allTasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
// ======
const createTask = async function (req, res) {
  try {
    const createdTask = await TASK.create(req.body);
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ msg: "ERROR" });
  }
};
// ======
const getTask = async function (req, res) {
  try {
    const { id: TASKID } = req.params; //just TASKID is an alias
    const taskWanted = await TASK.findById({ _id: TASKID });
    if (!taskWanted) {
      return res.status(404).json({ msg: "No task with the given ID" });
    }
    res.status(200).json({ taskWanted });
  } catch (error) {
    res.status(500).json({ msg: "Error in the server" });
  }
};
// ======
const deleteTask = async function (req, res) {
  try {
    const { id } = req.params;
    const taskToBeDeleted = await TASK.findOneAndDelete({ _id: id });
    if (!taskToBeDeleted)
      return res.status(404).json({ msg: "No task with this id " });
    res.status(200).json({ msg: `task with id ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};
// ======
const updateTask = async function (req, res) {
  try {
    const { id } = req.params;
    const taskUpdate = await TASK.findByIdAndUpdate({ _id: id }, req.body, {
      runValidators: true,
      new: true,
    });
    if (!taskUpdate) {
      return res.status(404).json({ msg: "task not found to be updated" });
    }
    res.status(200).json({ taskUpdate });
  } catch (error) {
    res.status(500).json({ msg: "server error my friend" });
  }
};
// ======

module.exports = { getAllTasks, createTask, updateTask, deleteTask, getTask };
