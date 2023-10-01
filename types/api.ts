
  
export type ApiSuccess<T = string> = {
    data: T;
    status: "success" | "failed"
};

export type ApiError = {
    message: string, 
    status: "success" | "failed"
};