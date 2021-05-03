import React from "react";
import {
  Card,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { formatAnswer } from "../helperFunctions";
import { Heading, Subheading } from "../fonts";
import Layout from "../Layout";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerStyle: {
      marginTop: "50px",
      maxWidth: "90%",
    },
    feedCardStyle: {
      height: "auto",
      width: "auto",
      alignItems: "center",
      padding: "25px",
    },
    gridItemStyle: {
      maxWidth: "25%",
      minWidth: "350px",
    },
    linkStyle: {
      textDecoration: "none",
    },
    loading: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "500px",
    },
  })
);

export const IndexPage = () => {
  const classes = useStyles();
  const { feeds, loading } = useAppContext();

  return (
    <Layout breadcrumbs={[]}>
      <Heading>Feeds</Heading>
      <br />
      <Grid container spacing={4} wrap="wrap">
        {feeds.map((feed) => {
          return (
            <Grid item xs={3} className={classes.gridItemStyle}>
              <Link
                to={"/feeds/" + feed.pair[0] + "-" + feed.pair[1]}
                className={classes.linkStyle}
              >
                <Card className={classes.feedCardStyle}>
                  <Subheading>{feed.name}</Subheading>
                  <Typography variant="body1">
                    {formatAnswer(feed!.sign, feed!.answer, feed!.multiply)}
                  </Typography>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
      {loading && (
        <div className={classes.loading}>
          <Typography variant="h6">Loading...</Typography>
        </div>
      )}
    </Layout>
  );
};
export default IndexPage;
