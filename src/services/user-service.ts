import { toast } from "react-toastify";
import api from "../const/api";
import {
  IUserCreateDto,
  IUserListFilter,
  IUserUpdateDto,
} from "../types/user-types";

class UserService {
  async getUserList(filter: IUserListFilter = {}) {
    try {
      const params = new URLSearchParams();
      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, String(value));
        }
      });
      const query = params.toString();
      const res = await api.get(`/users${query ? `?${query}` : ""}`);
      return res.data;
    } catch (e) {
      const error = e as { message: string };
      toast.error(error.message);
    }
  }
  async getProfile() {
    try {
      const res = await api.get(`/users/profile`);
      return res.data;
    } catch (e) {
      const error = e as { message: string };
      toast.error(error.message);
    }
  }
  async getUser(uuid: string) {
    try {
      const res = await api.get(`/users/${uuid}`);
      return res.data;
    } catch (e) {
      const error = e as { message: string };
      toast.error(error.message);
    }
  }
  async createUser(data: IUserCreateDto) {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);

      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }

      const res = await api.post("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (e) {
      const error = e as { message: string };
      toast.error(error.message);
    }
  }
  async updateUser(data: IUserUpdateDto) {
    try {
      const formData = new FormData();
      formData.append("name", data.name || "");
      formData.append("email", data.email || "");
      formData.append("role", data.role || "");

      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }

      const res = await api.put(`/users/${data.uuid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (e) {
      const error = e as { message: string };
      toast.error(error.message);
    }
  }
  async deleteUser(uuid: string) {
    try {
      const res = await api.delete(`/users/${uuid}`);
      return res.data;
    } catch (e) {
      const error = e as { message: string };
      toast.error(error.message);
    }
  }
}

export default new UserService();
