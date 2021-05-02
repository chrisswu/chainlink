import { BigNumber, Contract, ethers } from "ethers";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FeedData } from "./types";

type AppContext = {
  feeds: FeedData[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFeeds: React.Dispatch<React.SetStateAction<FeedData[]>>;
};

const AppContext = createContext<AppContext>({
  feeds: [],
  loading: false,
  setLoading: () => null,
  setFeeds: () => null,
});

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: React.FunctionComponent<AppProviderProps> = ({
  children,
}) => {
  const [feeds, setFeeds] = useState<FeedData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchFeeds = async () => {
      const ABI: ethers.ContractInterface = [
        "function latestAnswer() view returns (int256)",
        "function latestTimestamp() view returns (uint256)",
      ];
      const provider = new ethers.providers.InfuraProvider();
      try {
        const response = await fetch(
          "https://weiwatchers.com/feeds-mainnet.json"
        );
        const result = await response.json();
        const toFeedData = await Promise.all<FeedData>(
          result
            .filter((feed: any) => feed.ens != null)
            .map(
              async (feed: any): Promise<FeedData> => {
                const contract: Contract = new ethers.Contract(
                  feed.contractAddress,
                  ABI,
                  provider
                );
                const answer: BigNumber = await contract.latestAnswer();
                return {
                  name: feed.name,
                  address: feed.contractAddress,
                  answer: answer,
                  threshold: feed.threshold,
                  heartbeat: feed.heartbeat,
                  updateTime: "",
                  pair: feed.pair,
                  sign: feed.valuePrefix,
                  multiply: feed.multiply,
                };
              }
            )
        );
        setFeeds(toFeedData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFeeds();
  }, []);

  return (
    <AppContext.Provider value={{ feeds, loading, setLoading, setFeeds }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { useAppContext };
