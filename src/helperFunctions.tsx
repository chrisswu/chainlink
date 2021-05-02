import { BigNumber } from "@ethersproject/bignumber";

export const formatAnswer = (
  sign: string,
  bigNum: BigNumber,
  multiply: number
) => {
  const multiplyString = multiply.toString();
  let answer = bigNum.toString();
  while (answer.length < multiplyString.length) {
    answer = "0" + answer;
  }
  let temp = answer.split("").reverse();
  temp.splice(multiplyString.length - 1, 0, ".");
  const price = temp.reverse().join("");
  return sign + price;
};

export const formatTimestamp = (unixTimestamp: number) => {
  var formatted = new Date(unixTimestamp * 1000);
  var date = formatted.toUTCString();
  return date;
};
