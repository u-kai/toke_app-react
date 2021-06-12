import React from 'react'
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    })
)

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
]

export const MultipleSelect = () => {
    const classes = useStyles()
    const theme = useTheme()
    const [personName, setPersonName] = React.useState<string[]>([])

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPersonName(event.target.value as string[])
    }

    const handleChangeMultiple = (event: React.ChangeEvent<{ value: unknown }>) => {
        const { options } = event.target as HTMLSelectElement
        const value: string[] = []
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value)
            }
        }
        setPersonName(value)
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="select-multiple-native">
                    Native
                </InputLabel>
                <Select
                    multiple
                    native
                    value={personName}
                    onChange={handleChangeMultiple}
                    inputProps={{
                        id: 'select-multiple-native',
                    }}
                >
                    {names.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
