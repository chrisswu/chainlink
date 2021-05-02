import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { BigNumber, Contract, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { Heading, Subheading } from "../fonts";
import { formatAnswer, formatTimestamp } from "../helperFunctions";
import { FeedData } from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerStyle: {
      marginTop: "50px",
      maxWidth: "90%",
    },
    paperStyle: {
      padding: "30px",
      minHeight: "300px",
      alignItems: "center",
      display: "flex",
    },
    loading: {
      margin: "auto",
    },
  })
);

const FeedPage = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const feedName = id.split("-").join(" / ");
  const { feeds, loading } = useAppContext();
  const [feed, setFeed] = useState<FeedData>();

  useEffect(() => {
    const currFeed = feeds.find(
      (feed) => feed.pair[0] + "-" + feed.pair[1] === id
    );
    if (currFeed !== undefined) {
      const fetchFeed = async () => {
        const ABI: ethers.ContractInterface = [
          "function latestAnswer() view returns (int256)",
          "function latestTimestamp() view returns (uint256)",
        ];
        const provider = new ethers.providers.InfuraProvider();
        const contract: Contract = new ethers.Contract(
          currFeed.address,
          ABI,
          provider
        );
        const answer: BigNumber = await contract.latestAnswer();
        const timestamp: BigNumber = await contract.latestTimestamp();
        setFeed({
          ...currFeed,
          answer: answer,
          updateTime: formatTimestamp(timestamp.toNumber()),
        });
      };
      fetchFeed();
    }
  }, [loading]);

  return (
    <Container className={classes.containerStyle}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Heading>{feedName}</Heading>
        </Grid>
        <Grid item>
          <Paper className={classes.paperStyle}>
            {feed !== undefined && (
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Subheading>Latest Answer</Subheading>
                  <Typography variant="body1">
                    {formatAnswer(feed!.sign, feed!.answer, feed!.multiply)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Subheading>Deviation Threshold</Subheading>
                  <Typography variant="body1">{feed!.threshold}</Typography>
                </Grid>
                <Grid item>
                  <Subheading>Heartbeat</Subheading>
                  <Typography variant="body1">{feed!.heartbeat}</Typography>
                </Grid>
                <Grid item>
                  <Subheading>Last Update Time</Subheading>
                  <Typography variant="body1">{feed!.updateTime}</Typography>
                </Grid>
              </Grid>
            )}
            {feed === undefined && (
              <div className={classes.loading}>
                <Typography variant="h6">Loading...</Typography>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
export default FeedPage;
