import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import toast from "react-hot-toast";

export const useUrls = () => {
  return useQuery({
    queryKey: ["urls"],
    queryFn: async () => {
      const response = await api.get("/urls");
      return response.data.urls || [];
    },
  });
};

export const useCreateUrl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (originalUrl: string) => {
      const response = await api.post("/urls", { originalUrl });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
  });
};

export const useDeleteUrl = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`urls/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      toast.success("Url deleted successfully");
    },
  });
};
