import { BigNumber } from "@ethersproject/bignumber";

export type FeedData = {
  name: string;
  address: string;
  answer: BigNumber;
  threshold: number;
  heartbeat: number;
  updateTime: string;
  pair: string[];
  sign: string;
  multiply: number;
};
