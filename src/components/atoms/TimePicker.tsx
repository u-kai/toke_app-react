import React,{VFC} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
);


type Props = {
    id?:string
    label:string
    onChange?:(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}
export const TimePicker:VFC<Props> = (props)=> {
  const classes = useStyles();
        const {id="time",label,onChange} = props
  return (
    <form className={classes.container} noValidate>
      <TextField
        id={id}
        label={label}
        type="time"
        defaultValue="00:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        onChange={onChange}
      />
    </form>
  );
}