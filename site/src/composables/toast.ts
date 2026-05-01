import { toast } from "vue-sonner";
import type { ChangedCase } from "~/lib/case-police";

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

  const correct = (msg?: ChangedCase[]) => {
    if (msg?.length) {
      const groups = msg.reduce<Record<string, number>>((acc, { from, to }) => {
        const key = `${from} → ${to}`;
        acc[key] = (acc[key] ?? 0) + 1;
        return acc;
      }, {});

      const description = Object.entries(groups)
        .map(([key, count]) => `${key}${count > 1 ? ` (x${count})` : ""}`)
        .join(", ");

      toast.success(`Corrected ${msg.length} words`, { description });
    } else {
      toast.info("All cases are correct!");
    }
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
    correct,
    import: onImport
  };
};
