import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: "70%",
      },
    },
  }),
);



export const MultilineTextFields = ()=> {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
        value={value}
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
        //   defaultValue="Default Value"
          onChange={handleChange}
          variant="outlined"
        />
      </div>
    </form>
  );
}