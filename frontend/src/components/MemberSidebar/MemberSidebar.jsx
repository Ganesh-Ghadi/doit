import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross1 } from 'react-icons/rx';
import { closeSidebar } from '../../features/MemberSidebarSlice/MemberSidebarSlice';
import {
  addMembers,
  removeMembers,
} from '../../features/MemberSlice/memberSlice';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const MemberSidebar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const { isOpen } = useSelector((store) => store.MemberSidebar);
  const { members } = useSelector((store) => store.Member);
  const dispatch = useDispatch();

  const {
    data: users,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/users', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);
      return response.data.data.Users;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log('error = ', error);
      console.log('error message = ', error.message);
    },
  });

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40" // Dark overlay that covers the entire screen
          onClick={() => {
            dispatch(closeSidebar());
            // Close the sidebar when the overlay is clicked
            // You'll need to dispatch an action to update the `isOpen` state
          }}
        ></div>
      )}
      <div
        className={` ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } fixed z-50 bg-white top-0 right-0  w-96 transition-transform duration-300 ease-in-out min-h-screen`}
      >
        <div className="flex justify-between items-center mt-4 mb-2 mx-4">
          <h1 className="text-2xl font-bold">Select Members</h1>
          <button
            onClick={() => {
              dispatch(closeSidebar());
            }}
          >
            <RxCross1 />
          </button>
        </div>
        <div className="mx-4">Select members to add to your project.</div>
        <div className="content">
          {users && users.length > 0 ? (
            <ul>
              {users.map((user) => (
                <div
                  key={user.id}
                  className="box flex justify-between my-4 items-center mx-5 w-[90%] h-14 rounded-lg border"
                >
                  <p className="mx-4 text-sm">{user.name}</p>
                  <input
                    checked={members.some((member) => member.id === user.id)} // Check if user is in the members array
                    onChange={() => {
                      // If the checkbox is checked, add the user, else remove them
                      if (members.some((member) => member.id === user.id)) {
                        dispatch(removeMembers({ id: user.id }));
                      } else {
                        dispatch(addMembers([user])); // Add user to the members list
                      }
                    }}
                    className="mx-4"
                    type="checkbox"
                  />
                </div>
              ))}
            </ul>
          ) : (
            <p>No users available</p> // Handle the case where there are no users
          )}
          {/* display users */}
        </div>
      </div>
    </>
  );
};

export default MemberSidebar;
