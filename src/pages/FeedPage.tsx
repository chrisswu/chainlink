import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { BigNumber, Contract, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { Bodyheading, Heading, Subheading } from "../fonts";
import { formatAnswer, formatTimestamp } from "../helperFunctions";
import Layout from "../components/Layout";
import { FeedABI, FeedData } from "../types";
import { Skeleton } from "@material-ui/lab";

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
  const { feeds, loading } = useAppContext();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const feedName = id.split("-").join(" / ");
  const [feed, setFeed] = useState<FeedData>();

  useEffect(() => {
    const currFeed = feeds.find(
      (feed) => feed.pair[0] + "-" + feed.pair[1] === id
    );
    if (feeds.length > 0 && currFeed === undefined) history.push("/notfound");
    if (currFeed !== undefined) {
      const fetchFeed = async () => {
        const provider = new ethers.providers.InfuraProvider();
        const contract: Contract = new ethers.Contract(
          currFeed.address,
          FeedABI,
          provider
        );
        const answer: BigNumber = await contract.latestAnswer();
        const timestamp: BigNumber = await contract.latestTimestamp();
        setFeed({
          ...currFeed,
          answer: answer.toString(),
          updateTime: timestamp.toNumber(),
        });
      };
      fetchFeed();
    }
  }, [loading]);

  return (
    <Layout breadcrumbs={[{ name: "Feeds", path: "", icon: "home" }]}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Heading>{feed !== undefined ? feedName : <Skeleton />}</Heading>
        </Grid>
        <Grid item>
          <Paper className={classes.paperStyle} elevation={3}>
            {feed !== undefined && (
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Bodyheading>Latest Answer</Bodyheading>
                  <Typography variant="body2">
                    {formatAnswer(feed!.sign, feed!.answer, feed!.multiply)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Bodyheading>Deviation Threshold</Bodyheading>
                  <Typography variant="body2">{feed!.threshold}</Typography>
                </Grid>
                <Grid item>
                  <Bodyheading>Heartbeat</Bodyheading>
                  <Typography variant="body2">{feed!.heartbeat}</Typography>
                </Grid>
                <Grid item>
                  <Bodyheading>Last Update Time</Bodyheading>
                  <Typography variant="body2">
                    {formatTimestamp(feed!.updateTime)}
                  </Typography>
                </Grid>
              </Grid>
            )}
            {feed === undefined && (
              <div className={classes.loading}>
                <Subheading>Loading...</Subheading>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};
export default FeedPage;
