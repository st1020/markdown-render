import { toast } from "vue-sonner";

export const useToast = () => {
  const save = () => {
    toast.success("Your changes have been saved");
  };

  return {
    save
  };
};
