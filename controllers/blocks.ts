import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../utils/asyncWrapper";
import HTTPError from "../utils/HTTPError";
import APIFeatures from "../utils/APIFeatures";

export const getAllBlocks = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { timestamp } = req.query;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    if (!timestamp) {
      return next(
        new HTTPError("Please provide timestamp to get all blocks!", 400)
      );
    }

    let { data: blocks } = await axios(
      `https://blockchain.info/blocks/${timestamp}?format=json`
    );
    const numberOfPages = Math.floor(blocks.length / limit);

    blocks = APIFeatures.paginate(blocks, page, limit);

    res.status(200).json({
      message: "success",
      results: blocks.length,
      data: blocks,
      numberOfPages,
    });
  }
);

export const getBlock = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hash } = req.params;

    if (!hash) {
      return next(new HTTPError("Hash must be defined!", 400));
    }

    const { data } = await axios(`https://blockchain.info/rawblock/${hash}`);

    res.status(200).json({
      status: "success",
      data,
    });
  }
);
