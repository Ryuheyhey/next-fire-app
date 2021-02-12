import React, { FC, ChangeEvent } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";
import { type } from "os";

type Props = {
  onClick?: () => void;
  label: string;
};

const useStyles = makeStyles({
  button: {
    backgroundColor: "#990000",
    color: "#ffffff",
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
  },
});

const ComponentButton: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  );
};

export default ComponentButton;
