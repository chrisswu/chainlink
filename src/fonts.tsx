import { createStyles, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() =>
  createStyles({
    heading: {
      fontWeight: "bold",
    },
    subheading: {
      fontWeight: "bold",
    },
  })
);

export const Heading = ({ children }: { children: any }) => {
  return (
    <Typography variant="h2" className={useStyles().heading}>
      {children}
    </Typography>
  );
};

export const Subheading = ({ children }: { children: any }) => {
  return (
    <Typography variant="h5" className={useStyles().subheading}>
      {children}
    </Typography>
  );
};
