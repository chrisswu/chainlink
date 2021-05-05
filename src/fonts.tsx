import { Typography } from "@material-ui/core";

export const Heading = ({ children }: { children: any }) => {
  return (
    <Typography variant="h2" color="primary">
      {children}
    </Typography>
  );
};

export const Subheading = ({ children }: { children: any }) => {
  return (
    <Typography variant="h5" color="primary">
      {children}
    </Typography>
  );
};

export const Bodyheading = ({ children }: { children: any }) => {
  return (
    <Typography variant="h6" color="secondary">
      {children}
    </Typography>
  );
};
