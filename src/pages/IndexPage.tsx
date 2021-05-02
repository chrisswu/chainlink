import React from "react";
import {
  Box,
  Card,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { formatAnswer } from "../helperFunctions";
import { Heading, Subheading } from "../fonts";

const useStyles = makeStyles(() =>
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
  })
);

export const IndexPage = () => {
  const classes = useStyles();
  const { feeds } = useAppContext();

  return (
    <Container className={classes.containerStyle}>
      <Heading>Feeds</Heading>
      <br />
      <Grid container spacing={4} wrap="wrap">
        {feeds.map((feed) => {
          return (
            <Grid item xs={3} className={classes.gridItemStyle}>
              <Link
                to={"/" + feed.pair[0] + "-" + feed.pair[1]}
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
    </Container>
  );
};
export default IndexPage;
