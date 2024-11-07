import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "../../features/MemberSidebarSlice/MemberSidebarSlice";
import { FaRegUser } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import {
  removeMembers,
  addMembers,
} from "../../features/MemberSlice/memberSlice";
import { useEffect } from "react";

const EditTask = () => {
  const { id: taskId } = useParams();
  const dispatch = useDispatch();
  const { members } = useSelector((store) => store.Member);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const navigate = useNavigate();
  const formSchema = z.object({
    title: z.string().min(1, "Title field is required"),
    description: z.string().min(1, "Description field is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "", // Default empty string
      description: "", // Default empty string
    },
  });

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["editTask", taskId],
    queryFn: async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/tasks/${taskId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the Bearer token
          },
        }
      );

      console.log("Response data:", response.data); // Log response data
      setValue("title", response.data.data.Task.title || "");
      setValue("description", response.data.data.Task.description || "");
      dispatch(addMembers(response?.data?.data?.Task?.assign_to));

      return response.data;
    },
    onSuccess: (data) => {
      console.log("onSuccess triggered with data:", data);
    },
    onError: (error) => {
      console.log("error = ", error);
      console.log("error message = ", error.message);
    },
  });

  useEffect(() => {
    console.log("isLoading:", isLoading);
    console.log("isError:", isError);
    console.log("isSuccess:", isSuccess);
  }, [isLoading, isError, isSuccess]);

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/tasks/${taskId}`,
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
      console.log("task created", data);
      toast.success("Task Added Successfully");
      navigate("/tasks");
    },
    onError: (error) => {
      console.log("got error ", error);
    },
  });

  const onSubmit = (data) => {
    const assign_to = members.map((member) => member.id);

    const projectData = {
      ...data,
      assign_to,
    };
    updateMutation.mutate(projectData);
  };

  return (
    <>
      <div className="l">
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div className="mb-6">
            <label
              htmlFor="default-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Task Name
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="default-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Task Description
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
          <div className="mb-6">
            <label
              htmlFor="default-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Assign Task
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
            {members && members.length > 0 ? (
              members.map((member) => (
                <div
                  key={member.id}
                  className="mb-6 w-[90%] rounded-lg border-2 border-black flex justify-between border px-3 py-5 items-center"
                >
                  <button
                    type="button"
                    className="flex gap-4 hover:bg-slate-50 items-center"
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
              ))
            ) : (
              <p>No members added yet.</p> // Friendly message when no members exist
            )}
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default EditTask;
