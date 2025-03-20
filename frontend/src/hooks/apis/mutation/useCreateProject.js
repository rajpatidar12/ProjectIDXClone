import { useMutation } from "@tanstack/react-query";
import { createprojectApi } from "../projects.js";

export const useCreateProject = () => {
  const { mutateAsync, isPending, isSuccess, error } = useMutation({
    mutationFn: createprojectApi,
    onSuccess: (data) => {
      console.log("project crteated succesfully", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return {
    createProjectMutuation: mutateAsync,
    isPending,
    isSuccess,
    error,
  };
};
