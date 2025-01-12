import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { showSuccessToast, showErrorToast } from '../utils/toastConfig';

const CreateTask = () => {
  const initialState = {
    taskTitle: '',
    taskDescription: '',
    assignDate: '',
    deadlineDate: '',
    assignTo: '',
    category: '',
    priority: 'Medium', // Default priority
    attachedFile: null,
  };

  const [formData, setFormData] = useState(initialState);
  const [userData, setUserData] = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData((prev) => ({
      ...prev,
      attachedFile: files[0],
    }));
  };

  const clearSelectedFile = () => {
    setFormData((prev) => ({
      ...prev,
      attachedFile: null,
    }));
  };

  const createNewTask = () => ({
    taskTitle: formData.taskTitle,
    assignDate: formData.assignDate,
    deadlineDate: formData.deadlineDate,
    category: formData.category,
    priority: formData.priority,
    taskDescription: formData.taskDescription,
    active: false,
    newTask: true,
    failed: false,
    completed: false,
    attachedFile: formData.attachedFile,
  });

  const submitHandler = (e) => {
    e.preventDefault();

    try {
      const employee = userData.find((emp) => emp.firstName === formData.assignTo);
      if (!employee) {
        showErrorToast('Employee not found!');
        return;
      }

      const updatedData = userData.map((emp) => {
        if (emp.firstName === formData.assignTo) {
          return {
            ...emp,
            tasks: [...emp.tasks, createNewTask()],
            taskCounts: {
              ...emp.taskCounts,
              newTask: emp.taskCounts.newTask + 1,
            },
          };
        }
        return emp;
      });

      setUserData(updatedData);
      showSuccessToast('Task created successfully!');
      setFormData(initialState);
    } catch (error) {
      showErrorToast('Failed to create task. Please try again.');
    }
  };

  return (
    <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-md shadow-black/10 mt-6">
      <h2 className="text-xl font-bold text-gray-100 mb-6">Create New Task</h2>
      <form onSubmit={submitHandler} className="flex flex-wrap w-full items-start justify-between">
        <div className="w-1/2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Task Title</label>
            <input
              name="taskTitle"
              value={formData.taskTitle}
              onChange={handleInputChange}
              className="w-4/5 px-4 py-2 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              type="text"
              placeholder="Make a UI design"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Assign Date</label>
            <input
              name="assignDate"
              value={formData.assignDate}
              onChange={handleInputChange}
              className="w-4/5 px-4 py-2 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              type="date"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Deadline Date</label>
            <input
              name="deadlineDate"
              value={formData.deadlineDate}
              onChange={handleInputChange}
              className="w-4/5 px-4 py-2 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              type="date"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Assign To</label>
            <select
              name="assignTo"
              value={formData.assignTo}
              onChange={handleInputChange}
              className="w-4/5 px-4 py-2 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-[#1e1e1e] text-gray-300 appearance-none"
              required
            >
              <option value="" disabled>
                Select an employee
              </option>
              {userData.map((emp) => (
                <option
                  key={emp.id}
                  value={emp.firstName}
                  className="bg-[#252525] text-gray-300 hover:bg-gray-700"
                >
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-4/5 px-4 py-2 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              type="text"
              placeholder="design, dev, etc"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-4/5 px-4 py-2 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-[#1e1e1e] text-gray-300 appearance-none"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="w-2/5">
          <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
          <textarea
            name="taskDescription"
            value={formData.taskDescription}
            onChange={handleInputChange}
            className="w-full px-4 py-2 h-44 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
            required
          />
          <div className="mb-4 mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Attach File</label>
            {!formData.attachedFile ? (
              <input
                name="attachedFile"
                onChange={handleFileChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-[#1e1e1e] text-gray-300 transition-all"
                type="file"
              />
            ) : (
              <div className="text-sm text-green-400 flex items-center">
                File selected: {formData.attachedFile.name}
                <button
                  type="button"
                  onClick={clearSelectedFile}
                  className="ml-2 text-red-500 underline hover:text-red-700"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
