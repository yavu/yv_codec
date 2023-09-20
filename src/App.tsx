import React from 'react';
import { ReactNode } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Divider, FormControl, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DarkTheme } from './theme/dark';

import { Codec } from './codec/interface';
import { IntlMorseCodec } from './codec/intl_morse';
import { JpMorseCodec } from './codec/jp_morse';
import { YvWave2023Codec } from './codec/yv_wave_2023';

export default function App(): JSX.Element {
    const codecs = [new IntlMorseCodec(), new JpMorseCodec(), new YvWave2023Codec()];

    const [type, setType] = React.useState("0");
    const HandleTypeChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
        const codec: Codec = [new IntlMorseCodec(), new JpMorseCodec(), new YvWave2023Codec()][Number(event.target.value)];
        text !== "" ? setCode(codec.encode(text)) : setText(codec.decode(code));
    };

    const [short_char, setShortChar] = React.useState<string>("·");
    const HandleShortCharChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShortChar(event.target.value);
    };

    const [long_char, setLongChar] = React.useState<string>("-");
    const HandleLongCharChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLongChar(event.target.value);
    };

    const [text, setText] = React.useState<string>("");
    const HandleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
        const codec: Codec = [new IntlMorseCodec(), new JpMorseCodec(), new YvWave2023Codec()][Number(type)];
        setCode(codec.encode(event.target.value));
    };

    const [code, setCode] = React.useState<string>("");
    const HandleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
        const codec: Codec = [new IntlMorseCodec(), new JpMorseCodec(), new YvWave2023Codec()][Number(type)];
        setText(codec.decode(event.target.value));
    };

    const menu_items = codecs.map((codec, index) => {
        return <MenuItem key={index} value={index}>
            {codec.name}
        </MenuItem>
    })

    return (
        <>
            <header>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </header>
            <body>
                <ThemeProvider theme={DarkTheme}>
                    <CssBaseline />
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        flexWrap="nowrap"
                        alignItems="flex-start"
                    //overflow='hidden'
                    >
                        <Paper
                            elevation={2}
                            sx={{
                                height: "auto",
                                minWidth: DarkTheme.spacing(20),
                                maxWidth: DarkTheme.spacing(24),
                                padding: DarkTheme.spacing(1),
                                paddingBottom: "0",
                                margin: DarkTheme.spacing(1),
                                overflowX: "hidden",
                                overflowY: "auto"
                            }}
                        >
                            <Typography
                                variant="h5"
                            >
                                YV-Codec
                            </Typography>
                            <Divider
                                sx={{
                                    marginTop: DarkTheme.spacing(0.5),
                                    marginBottom: DarkTheme.spacing(1)
                                }}
                            />
                            <PropertyWrapper>
                                <Typography
                                    variant="h5"
                                >
                                    Type
                                </Typography>
                                <FormControl
                                    size="small"
                                    margin="dense"
                                    fullWidth
                                >
                                    <Select
                                        id="type-select"
                                        defaultValue={"0"}
                                        onChange={HandleTypeChange}
                                    >
                                        {menu_items}
                                    </Select>
                                </FormControl>
                            </PropertyWrapper>
                            <PropertyWrapper>
                                <Typography
                                    variant="h5"
                                >
                                    Convert
                                </Typography>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    flexWrap="nowrap"
                                    alignItems="flex-start"
                                    gap={DarkTheme.spacing(1)}
                                >
                                    <TextField
                                        defaultValue={"·"}
                                        label="Short"
                                        size="small"
                                        margin="dense"
                                        multiline
                                        maxRows={8}
                                        value={short_char}
                                        fullWidth
                                        onChange={HandleShortCharChange}
                                        sx={{
                                            display: `${Number(type) < 2 ? "block" : "none"}`
                                        }}
                                    />
                                    <TextField
                                        defaultValue={"-"}
                                        label="Long"
                                        size="small"
                                        margin="dense"
                                        value={long_char}
                                        fullWidth
                                        onChange={HandleLongCharChange}
                                        sx={{
                                            display: `${Number(type) < 2 ? "block" : "none"}`
                                        }}
                                    />
                                </Grid>
                                <TextField
                                    label="Text"
                                    size="small"
                                    margin="dense"
                                    value={text}
                                    fullWidth
                                    onChange={HandleTextChange}
                                />
                                <TextField
                                    label="Code"
                                    size="small"
                                    margin="dense"
                                    multiline
                                    maxRows={8}
                                    value={code}
                                    fullWidth
                                    onChange={HandleCodeChange}
                                />
                            </PropertyWrapper>
                        </Paper>
                    </Grid>
                </ThemeProvider>
            </body>
        </>
    )
}

type Props = {
    children: ReactNode;
};

function PropertyWrapper({ children }: Props): JSX.Element {
    return (
        <Paper
            elevation={6}
            sx={{
                width: "100%",
                padding: DarkTheme.spacing(1),
                marginBottom: DarkTheme.spacing(1)
            }}
        >
            {children}
        </Paper>
    )
}
