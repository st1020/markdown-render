import { toast } from "vue-sonner";

export const useToast = () => {
  const save = () => {
    toast.success("Your changes have been saved");
  };

  const onSwitch = (msg: string) => {
    toast.info(`Switched to resume "${msg}"`);
  };

  const onDelete = (msg: string) => {
    toast.error(`Resume "${msg}" has been deleted`);
  };

  const onNew = () => {
    toast.success("New resume created");
  };

  const duplicate = (msg: string) => {
    toast.success(`Created resume "${msg}"'s duplication "${msg} Copy"`);
  };

  const onImport = (msg: boolean) => {
    if (msg) {
      toast.success("Data has been successfully imported!");
    } else {
      toast.error("Data format is invalid.");
    }
  };

  return {
    save,
    switch: onSwitch,
    delete: onDelete,
    new: onNew,
    duplicate,
    import: onImport
  };
};
