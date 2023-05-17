const TASK = require("../model/model");
const asyncwrapper = require("../middlewares/asyncwrapper");

// ======
const getAllTasks = asyncwrapper(async function (req, res) {
  const tasks = await TASK.find({});
  res.status(200).json({ tasks });
});
// ======
const createTask = asyncwrapper(async function (req, res) {
  const task = await TASK.create(req.body);
  res.status(201).json(task);
});
// ======
const getTask = asyncwrapper(async function (req, res) {
  const { id: TASKID } = req.params; //just TASKID is an alias
  const task = await TASK.findById({ _id: TASKID });
  if (!task) {
    return res.status(404).json({ msg: "No task with the given ID" });
  }
  res.status(200).json({ task });
});
// ======
const deleteTask = asyncwrapper(async function (req, res) {
  const { id } = req.params;
  const task = await TASK.findOneAndDelete({ _id: id });
  if (!task) return res.status(404).json({ msg: "No task with this id " });
  res.status(200).json({ msg: `task with id ${id} deleted successfully` });
});
// ======
const updateTask = asyncwrapper(async function (req, res) {
  const { id } = req.params;
  const task = await TASK.findByIdAndUpdate({ _id: id }, req.body, {
    runValidators: true,
    new: true,
  });
  if (!task) {
    return res.status(404).json({ msg: "task not found to be updated" });
  }
  res.status(200).json({ task });
});
// ======

module.exports = { getAllTasks, createTask, updateTask, deleteTask, getTask };
