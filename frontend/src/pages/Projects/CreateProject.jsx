import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "../../features/MemberSidebarSlice/MemberSidebarSlice";
import { FaRegUser } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { removeMembers } from "../../features/MemberSlice/memberSlice";

const CreateProject = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((store) => store.MemberSidebar);
  const { members } = useSelector((store) => store.Member);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string().min(1, "Name field is required"),
    description: z.string().min(1, "Description field is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const storeMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/projects",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the Bearer token
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("project created", data);
      toast.success("Project Added Successfully");
      navigate("/projects");
    },
    onError: (error) => {
      console.log("got error ", error);
    },
  });

  const onSubmit = (data) => {
    storeMutation.mutate(data);
  };

  return (
    <>
      <div className="l">
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div class="mb-6">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Project Name
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="default-input"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
            )}
          </div>
          <div class="mb-6">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Project Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></textarea>
              )}
            />
            {errors.description && (
              <p className="text-red-500 mt-2 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div class="mb-6">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Assign Project
            </label>
            <button
              onClick={() => {
                dispatch(openSidebar());
              }}
              type="button"
              className="flex gap-4 hover:bg-slate-50 items-center w-[90%] px-3 py-5 rounded-lg border-2 border-black border"
            >
              <IoIosAddCircleOutline />
              <h1 className="text-sm"> Assign</h1>
            </button>
          </div>

          <div className="l">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Members added
            </label>
            {members.map((member) => (
              <div class="mb-6 w-[90%] rounded-lg border-2 border-black flex justify-between border px-3 py-5 items-center">
                <button
                  type="button"
                  className="flex gap-4 hover:bg-slate-50 items-center  "
                >
                  <FaRegUser />
                  <h1 className="text-sm">{member.name}</h1>
                </button>
                <button
                  onClick={() => {
                    dispatch(removeMembers({ id: member.id }));
                  }}
                >
                  <RxCross1 />
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProject;
