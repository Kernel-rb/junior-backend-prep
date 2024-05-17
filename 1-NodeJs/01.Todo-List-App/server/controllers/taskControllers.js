import Task from '../models/taskModel.js';

export const addTask = async (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ message: "Task is required" });
    }
    const newTask = new Task({ task });
    try {
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { done: true }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
