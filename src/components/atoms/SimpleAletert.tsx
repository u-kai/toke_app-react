import React,{VFC} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

type Props = {
    message:string
    severity: "error" | "success" | "info" | "warning" | undefined
}

export const SimpleAlert:VFC<Props> = (props) =>  {
  const classes = useStyles();
  const { message, severity = "error"} = props
  return (
    <div className={classes.root}>
      <Alert variant="outlined" severity={severity}>
      <AlertTitle>{severity.toUpperCase()}</AlertTitle>
       {message}
      </Alert>
    </div>
  );
}