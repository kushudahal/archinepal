import { Response } from "express";

export class ApiError extends Error {
  statusCode: number;
  code: string;

  constructor(statusCode: number, message: string, code = "API_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export function sendSuccess<T>(res: Response, data: T, statusCode = 200) {
  return res.status(statusCode).json({ success: true, data });
}
