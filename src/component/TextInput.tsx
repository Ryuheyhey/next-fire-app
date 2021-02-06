import React, {FC, ChangeEvent} from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type Props = {
  fullWidth: boolean
  label: string
  type: string
  //関数の型定義
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput: FC<Props> = (props) => {
  
  return (

  <TextField
          fullWidth={props.fullWidth}
          label={props.label}
          margin="dense"
          // multiline={props.multiline}
          // required={props.required}
          // rows={props.rows}
          // value={props.value}
          type={props.type}
          onChange={props.onChange}
          variant="filled"
          color="secondary"
        />
  )
}

export default TextInput