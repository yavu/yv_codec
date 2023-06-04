import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Unstable_Grid2';
import { FormControl, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { ReactNode } from 'react';

const DarkTheme = createTheme({
    typography: {
        fontFamily: [
            'Share Tech Mono'
        ].join(',')
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#00b0ff',
        },
        secondary: {
            main: '#ef6c00',
        },
        background: {
            default: '#101d31',
            paper: '#101d31',
        },
        error: {
            main: '#ff1744',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            ::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            
            ::-webkit-scrollbar-track {
                background: transparent;
            }
            
            ::-webkit-scrollbar-thumb {
                background: rgba(30, 160, 255, 0.3);
                border-radius: 8px;
                opacity: 0.1;
            }
            `
        }
    }
});

function morse_convert(mode: string, data: string[]): string[] {

    const morse_table: string[][] = [
        ["A", "·-", "half"],
        ["B", "-···", "half"],
        ["C", "-·-·", "half"],
        ["D", "-··", "half"],
        ["E", "·", "half"],
        ["F", "··-·", "half"],
        ["G", "--·", "half"],
        ["H", "····", "half"],
        ["I", "··", "half"],
        ["J", "·---", "half"],
        ["K", "-·-", "half"],
        ["L", "·-··", "half"],
        ["M", "--", "half"],
        ["N", "-·", "half"],
        ["O", "---", "half"],
        ["P", "·--·", "half"],
        ["Q", "--·-", "half"],
        ["R", "·-·", "half"],
        ["S", "···", "half"],
        ["T", "-", "half"],
        ["U", "··-", "half"],
        ["V", "···-", "half"],
        ["W", "·--", "half"],
        ["X", "-··-", "half"],
        ["Y", "-·--", "half"],
        ["Z", "--··", "half"],

        ["0", "-----", "half"],
        ["1", "·----", "half"],
        ["2", "··---", "half"],
        ["3", "···--", "half"],
        ["4", "····-", "half"],
        ["5", "·····", "half"],
        ["6", "-····", "half"],
        ["7", "--···", "half"],
        ["8", "---··", "half"],
        ["9", "----·", "half"],

        [" ", "", "other"],
        ["　", "", "other"],
        ["\n", "\n", "other"]
    ]

    if (mode === "encode") {
        return data.map(e =>
            morse_table.find(([k]) => k === e)?.[1] ?? "⛝"
        )
    }
    else if (mode === "decode") {
        return data.map(e =>
            morse_table.find(([, k]) => k === e)?.[0] ?? "⛝"
        )
    }
    else {
        return [];
    }
}

function encode(version: string, data: string): string {
    switch (version) {
        case "morse code (intl.)":
            return morse_convert("encode", data.toUpperCase().split("")).join(" ").replace(/\n /g, "\n").trim();
        case "yv_wave 2023":
            const replaces: [RegExp, string][] = [
                [/------/g, "ᛌ❚❚"],
                [/-----/g, "ᛌ❚❙"],
                [/----/g, "ᛌ❚❘"],
                [/---/g, "ᛌ❚"],
                [/--/g, "ᛌ❙"],
                [/-/g, "ᛌ❘"],
                [/······/g, "ᛧ❚❚"],
                [/·····/g, "ᛧ❚❙"],
                [/····/g, "ᛧ❚❘"],
                [/···/g, "ᛧ❚"],
                [/··/g, "ᛧ❙"],
                [/·/g, "ᛧ❘"]
            ];
            return morse_convert("encode", data.toUpperCase().split("")).map(e =>
                replaces.reduce((a, [f, t]) =>
                    a.replace(f, t), "❙" + e
                )
            ).join(" ").trim();
        default:
            return "";
    }
}

function decode(version: string, data: string): string {
    switch (version) {
        case "morse code (intl.)":
            return morse_convert("decode", data.replace(/\n/g, " \n ").toUpperCase().split(" ")).join("").trim();
        case "yv_wave 2023":
            const replaces: [RegExp, string][] = [
                [/^❙/g, ""],
                [/ᛌ❚❚/g, "------"],
                [/ᛌ❚❙/g, "-----"],
                [/ᛌ❚❘/g, "----"],
                [/ᛌ❚/g, "---"],
                [/ᛌ❙/g, "--"],
                [/ᛌ❘/g, "-"],
                [/ᛧ❚❚/g, "······"],
                [/ᛧ❚❙/g, "·····"],
                [/ᛧ❚❘/g, "····"],
                [/ᛧ❚/g, "···"],
                [/ᛧ❙/g, "··"],
                [/ᛧ❘/g, "·"]
            ];
            return morse_convert("decode", data.replace(/\n/g, " \n ").split(" ").map(e =>
                replaces.reduce((a, [f, t]) =>
                    a.replace(f, t), e
                )
            )).join("").trim();
        default:
            return "";
    }
}


export default function App(): JSX.Element {

    const [version, setVersion] = React.useState("morse code (intl.)");
    const HandleVersionChange = (event: SelectChangeEvent) => {
        setVersion(event.target.value);
        if (text !== "") {
            setCipher(encode(event.target.value, text));
        }
        else {
            setText(decode(event.target.value, cipher));
        }
    };

    const [text, setText] = React.useState<string>("");
    const HandleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
        setCipher(encode(version, event.target.value));

    };

    const [cipher, setCipher] = React.useState<string>("");
    const HandleCipherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCipher(event.target.value);
        setText(decode(version, event.target.value));
    };

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
                    >
                        <Paper
                            elevation={2}
                            sx={{
                                height: "auto",
                                width: "430px",
                                padding: "16px",
                                margin: "16px",
                                overflowX: "hidden",
                                overflowY: "auto"
                            }}
                        >
                            <Typography
                                variant="h5"
                                gutterBottom
                            >
                                Yv-Cipher
                            </Typography>
                            <PropertyWrapper>
                                <Typography
                                    variant="h5"
                                >
                                    Version
                                </Typography>
                                <FormControl
                                    size="small"
                                    margin="dense"
                                >
                                    <Select
                                        id="version-select"
                                        defaultValue={"morse code (intl.)"}
                                        onChange={HandleVersionChange}
                                        sx={{
                                            width: "366px",
                                            marginX: "auto"
                                        }}
                                    >
                                        <MenuItem value={"morse code (intl.)"}>morse code (intl.)</MenuItem>
                                        <MenuItem value={"morse code (jp)"}>morse code (jp)</MenuItem>
                                        <MenuItem value={"yv_code 2020"}>yv_code 2020</MenuItem>
                                        <MenuItem value={"yv_wave 2023"}>yv_wave 2023</MenuItem>
                                        <MenuItem value={"yv_strata 2023"}>yv_strata 2023</MenuItem>
                                    </Select>
                                </FormControl>
                            </PropertyWrapper>
                            <PropertyWrapper>
                                <Typography
                                    variant="h5"
                                >
                                    Convert
                                </Typography>
                                <TextField
                                    label="Text"
                                    size="small"
                                    margin="dense"
                                    multiline
                                    maxRows={8}
                                    value={text}
                                    fullWidth
                                    //sx={{
                                    //    width: "366px"
                                    //}}
                                    onChange={HandleTextChange}
                                />
                                <TextField
                                    label="Cipher"
                                    size="small"
                                    margin="dense"
                                    multiline
                                    maxRows={8}
                                    value={cipher}
                                    sx={{
                                        width: "366px"
                                    }}
                                    onChange={HandleCipherChange}
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
                width: "398px",
                padding: "16px",
                marginBottom: "16px"
            }}
        >
            {children}
        </Paper>
    )
}