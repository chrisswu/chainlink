import { ethers } from "ethers";

export type FeedData = {
  name: string;
  address: string;
  answer: string;
  threshold: number;
  heartbeat: number;
  updateTime: number;
  pair: string[];
  sign: string;
  multiply: number;
};

export type Breadcrumb = {
  icon: string;
  name: string;
  path: string;
};

export const FeedABI: ethers.ContractInterface = [
  "function latestAnswer() view returns (int256)",
  "function latestTimestamp() view returns (uint256)",
];
