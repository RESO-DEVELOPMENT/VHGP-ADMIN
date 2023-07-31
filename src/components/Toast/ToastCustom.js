import { toast } from "react-toastify";

export const notify = (title, status) => {
    switch (status) {
        case "Success":
            return toast.success(title, {
                position: "top-right",
                autoClose: 4000,
            });
        case "Warning":
            return toast.warn(title, {
                position: "top-right",
                autoClose: 4000,
            });
        case "Error":
            return toast.error(title, {
                position: "top-right",
                autoClose: 4000,
            });
        default:
            return toast.success(title, {
                position: "top-right",
                autoClose: 4000,
            });
    }
};
