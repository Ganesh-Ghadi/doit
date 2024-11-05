import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross1 } from 'react-icons/rx';
import { closeSidebar } from '../../features/MemberSidebarSlice/MemberSidebarSlice';

const MemberSidebar = () => {
  const { isOpen } = useSelector((store) => store.MemberSidebar);
  const sidebarRef = useRef(null); // Create a ref for the sidebar

  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        dispatch(closeSidebar());
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40" // Dark overlay that covers the entire screen
          onClick={() => {
            // Close the sidebar when the overlay is clicked
            // You'll need to dispatch an action to update the `isOpen` state
          }}
        ></div>
      )}
      <div
        ref={sidebarRef}
        className={` ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } fixed z-50 bg-white top-0 right-0  w-96 transition-transform duration-300 ease-in-out min-h-screen`}
      >
        <div className="flex justify-between items-center m-4">
          <h1 className="text-2xl font-bold">Select Members</h1>
          <button
            onClick={() => {
              dispatch(closeSidebar());
            }}
          >
            <RxCross1 />
          </button>
        </div>
      </div>
    </>
  );
};

export default MemberSidebar;
