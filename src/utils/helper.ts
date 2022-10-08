import {NextFunction, Request, Response} from "express";

class Helper {
  public calculOffset = async (limit: number, page: number): Promise<number> => {
    const offset: number = limit * (page - 1);
    return offset;
  }
}
export default Helper;
