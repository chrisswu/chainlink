import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { BigNumber, Contract, ethers } from "ethers";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FeedABI, FeedData } from "./types";

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
                  FeedABI,
                  provider
                );
                const answer: BigNumber = await contract.latestAnswer();
                return {
                  name: feed.name,
                  address: feed.contractAddress,
                  answer: answer.toString(),
                  threshold: feed.threshold,
                  heartbeat: feed.heartbeat,
                  updateTime: 0,
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

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "rgb(26, 43, 107)",
      },
      secondary: {
        main: "#375BD2",
      },
    },
    typography: {
      h2: {
        fontWeight: "bold",
      },
      h5: {
        fontWeight: "bold",
      },
      h6: {
        fontWeight: "bold",
      },
      body2: {
        fontSize: "1.3rem",
        fontFamily: `'Itim', cursive`,
      },
    },
  });

  return (
    <AppContext.Provider value={{ feeds, loading, setLoading, setFeeds }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { useAppContext };
