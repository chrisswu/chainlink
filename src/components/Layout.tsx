import {
  Breadcrumbs,
  Container,
  createStyles,
  Icon,
  Link,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { Breadcrumb } from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginTop: "50px",
      maxWidth: "90%",
    },
    breadcrumbs: {
      color: "primary",
      fontWeight: "bold",
    },
    containerStyle: {
      maxWidth: "90%",
    },
    icon: {
      marginRight: theme.spacing(1),
      width: 20,
      height: 20,
    },
  })
);

export const Layout = ({
  breadcrumbs,
  children,
}: {
  breadcrumbs: Breadcrumb[];
  children: any;
}) => {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.header}>
        {breadcrumbs && (
          <Breadcrumbs className={classes.breadcrumbs}>
            {breadcrumbs.map((breadcrumb) => {
              return (
                <Link color="primary" href={`/${breadcrumb.path}`}>
                  <Icon className={classes.icon}>{breadcrumb.icon}</Icon>
                  {`${breadcrumb.name} /`}
                </Link>
              );
            })}
          </Breadcrumbs>
        )}
      </Container>
      <br />
      <Container className={classes.containerStyle}>{children}</Container>
    </>
  );
};
export default Layout;
