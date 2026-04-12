import { Request, Response } from "express";
import {
  loginUser,
  registerUser,
  registerAdminUser,
  registerStaffUser,
  updateUserProfile,
} from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          data: null,
          message: "Missing required fields",
        });
    }

    const user = await registerUser({ name, email, password });
    return res
      .status(201)
      .json({
        success: true,
        data: user,
        message: "User registered successfully",
      });
  } catch (error: any) {
    return res
      .status(400)
      .json({
        success: false,
        data: null,
        message: error.message || "Registration failed",
      });
  }
};

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password, accessCode } = req.body;

    if (!name || !email || !password || !accessCode) {
      return res
        .status(400)
        .json({
          success: false,
          data: null,
          message: "Missing required fields or access code",
        });
    }

    const user = await registerAdminUser({ name, email, password, accessCode });
    return res
      .status(201)
      .json({
        success: true,
        data: user,
        message: "Admin registered successfully",
      });
  } catch (error: any) {
    return res
      .status(400)
      .json({
        success: false,
        data: null,
        message: error.message || "Admin registration failed",
      });
  }
};

export const registerStaff = async (req: Request, res: Response) => {
  try {
    const { name, email, password, accessCode } = req.body;

    if (!name || !email || !password || !accessCode) {
      return res
        .status(400)
        .json({
          success: false,
          data: null,
          message: "Missing required fields or access code",
        });
    }

    const user = await registerStaffUser({ name, email, password, accessCode });
    return res
      .status(201)
      .json({
        success: true,
        data: user,
        message: "Staff registered successfully",
      });
  } catch (error: any) {
    return res
      .status(400)
      .json({
        success: false,
        data: null,
        message: error.message || "Staff registration failed",
      });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          data: null,
          message: "Email and password are required",
        });
    }

    const result = await loginUser({ email, password });
    return res
      .status(200)
      .json({ success: true, data: result, message: "Logged in successfully" });
  } catch (error: any) {
    return res
      .status(401)
      .json({
        success: false,
        data: null,
        message: error.message || "Login failed",
      });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const user = (req as Request & { user?: any }).user;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, data: null, message: "Unauthorized" });
    }

    const { name, email, phone } = req.body;
    const updatedUser = await updateUserProfile(user.id, { name, email, phone });

    return res.json({
      success: true,
      data: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error.message || "Update failed",
    });
  }
};

export const checkEmailAvailability = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({
          success: false,
          data: null,
          message: "Email is required",
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({
          success: false,
          data: null,
          message: "Invalid email format",
        });
    }

    // Import the repository function to check email
    const { findUserByEmail } = await import("../repositories/userRepository");
    const existingUser = await findUserByEmail(email.trim().toLowerCase());

    return res.json({
      success: true,
      data: { available: !existingUser },
      message: existingUser ? "Email already registered" : "Email is available",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      data: null,
      message: "Failed to check email availability",
    });
  }
};
