import React,{VFC} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);


type Props = {
  color?: "default" | "primary" | "secondary" | "error" | undefined
  badgeContent:number
}
export const SimpleBadge:VFC<Props> = (props) => {
  const classes = useStyles();
  const {color,badgeContent} = props
  return (
    <div className={classes.root}>
      <Badge badgeContent={badgeContent} color={color}>
        <MailIcon />
      </Badge>
    </div>
  );
}