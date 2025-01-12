import React, { useContext, useEffect, useState } from 'react';
import Header from '../../other/Header';
import TaskListNumbers from '../../other/TaskListNumbers';
import TaskList from '../TaskList/TaskList';
import { AuthContext } from '../../context/AuthProvider';
import TaskPendingModal from './TaskPendingModal'; // Import the Modal

const EmployeeDashboard = ({ data, changeUser }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false); // State for showing the modal
  const [hasShownModal, setHasShownModal] = useState(false); // New state to track modal shown status

  useEffect(() => {
    if (!data || !data.id) {
      console.error("Employee data is missing or invalid.");
      return;
    }

    if (userData) {
      const updatedEmployee = userData.find(emp => emp.id === data.id);
      if (updatedEmployee) {
        const updatedData = { role: "employee", data: updatedEmployee };
        localStorage.setItem('loggedInUser', JSON.stringify(updatedData));
      }
    }

    // Only show the modal if it hasn't been shown already
    if (!hasShownModal) {
      setShowModal(true);
      setHasShownModal(true); // Update the state to prevent the modal from showing again
    }
  }, [userData, data.id, hasShownModal]);

  const closeModal = () => {
    setShowModal(false);
  };

  const currentEmployeeData = userData?.find(emp => emp.id === data.id) || data;

  if (!currentEmployeeData) {
    return <div>Loading...</div>; // Or handle this gracefully
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6 md:p-10">
      <Header data={currentEmployeeData} changeUser={changeUser} />
      <TaskListNumbers data={currentEmployeeData} />
      <TaskList data={currentEmployeeData} />
      {showModal && <TaskPendingModal onClose={closeModal} />}
    </div>
  );
};

export default EmployeeDashboard;
