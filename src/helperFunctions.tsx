import { BigNumber } from "@ethersproject/bignumber";

export const formatAnswer = (
  sign: string,
  bigNum: string,
  multiply: number
) => {
  const multiplyString = multiply.toString();
  let answer = bigNum;
  while (answer.length < multiplyString.length) {
    answer = "0" + answer;
  }
  let temp = answer.split("").reverse();
  temp.splice(multiplyString.length - 1, 0, ".");
  const price = temp.reverse().join("");
  return sign + stripZerosAfterDecimal(price);
};

const stripZerosAfterDecimal = (priceString: string) => {
  const decimal = priceString.split(".")[1];
  if (decimal.split("").every((digit) => digit === "0")) {
    return priceString.split(".")[0] + ".00";
  } else {
    return priceString.replaceAll(/0*$/g, "");
  }
};

export const formatTimestamp = (unixTimestamp: number) => {
  var formatted = new Date(unixTimestamp * 1000);
  var date = formatted.toUTCString();
  return date;
};
