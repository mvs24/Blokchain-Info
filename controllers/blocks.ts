import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../utils/asyncWrapper";
import HTTPError from "../utils/HTTPError";
import APIFeatures from "../utils/APIFeatures";
import redisClient from "../redis";
import { Block } from "../types/Block";

const sendAllBlocksResponse = (
  res: Response,
  blocks: Block[],
  numberOfPages: number
) => {
  res.status(200).json({
    message: "success",
    results: blocks.length,
    data: blocks,
    numberOfPages,
  });
};

export const getAllBlocks = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const timestamp = req.query.timestamp
      ? parseInt(req.query.timestamp as string)
      : Date.now();
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const redisKey = `${timestamp.toString()}-${page}-${limit}`;

    if (await redisClient.has(redisKey)) {
      const data = (await redisClient.getData(redisKey)) as Block[];
      const numberOfPages = Math.floor(data.length / limit);
      return sendAllBlocksResponse(res, data, numberOfPages);
    }

    let { data: blocks } = await axios(
      `https://blockchain.info/blocks/${timestamp}?format=json`
    );
    const numberOfPages = Math.floor(blocks.length / limit);

    blocks = APIFeatures.paginate(blocks, page, limit);
    redisClient.set(redisKey, blocks);

    sendAllBlocksResponse(res, blocks, numberOfPages);
  }
);

const sendGetBlockRespone = (res: Response, data: any) => {
  res.status(200).json({
    status: "success",
    data,
  });
};

export const getBlock = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hash } = req.params;
    const redisKey = `hash-${hash}`;

    if (!hash) {
      return next(new HTTPError("Hash must be defined!", 400));
    }

    if (await redisClient.has(redisKey)) {
      const data = await redisClient.getData(redisKey);
      return sendGetBlockRespone(res, data);
    }

    const { data } = await axios(`https://blockchain.info/rawblock/${hash}`);

    redisClient.set(redisKey, data);

    sendGetBlockRespone(res, data);
  }
);
