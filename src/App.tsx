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

function MorseConvert(mode: string, data: string[]): string[] {

    const morse_table: string[][] = [
        ["A", "·-"],
        ["B", "-···"],
        ["C", "-·-·"],
        ["D", "-··"],
        ["E", "·"],
        ["F", "··-·"],
        ["G", "--·"],
        ["H", "····"],
        ["I", "··"],
        ["J", "·---"],
        ["K", "-·-"],
        ["L", "·-··"],
        ["M", "--"],
        ["N", "-·"],
        ["O", "---"],
        ["P", "·--·"],
        ["Q", "--·-"],
        ["R", "·-·"],
        ["S", "···"],
        ["T", "-"],
        ["U", "··-"],
        ["V", "···-"],
        ["W", "·--"],
        ["X", "-··-"],
        ["Y", "-·--"],
        ["Z", "--··"],

        ["0", "-----"],
        ["1", "·----"],
        ["2", "··---"],
        ["3", "···--"],
        ["4", "····-"],
        ["5", "·····"],
        ["6", "-····"],
        ["7", "--···"],
        ["8", "---··"],
        ["9", "----·"],

        [" ", ""],
        ["　", ""],
        ["\n", "\n"]
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

function Encode(version: string, data: string): string {
    let result: string = "";
    switch (version) {
        case "morse code":
            result = MorseConvert("encode", data.toUpperCase().split("")).join(" ").replace(/ \n /g, "\n");
            break;
        case "yv_wave 2023":
            let morse_char: string[][] = MorseConvert("encode", data.toUpperCase().split("")).map(x => [x]);
            console.log(morse_char);
            for (let i = 0; i < morse_char.length; i++) {
                if (morse_char[i][0] !== "\n") {
                    let pos: number = 0;
                    while (pos < morse_char[i][0].length) {
                        let range: number = 1;
                        for (let n = pos + 1; morse_char[i][0].charAt(pos) === morse_char[i][0].charAt(n); n++) {
                            range++;
                        }
                        morse_char[i].push(morse_char[i][0].substring(pos, pos + range));
                        pos += range;
                    }
                    morse_char[i].shift();
                    for (let j = 0; j < morse_char[i].length; j++) {
                        switch (morse_char[i][j]) {
                            case "-":
                                morse_char[i].splice(j, 1, "ᛌ❘");
                                break;
                            case "--":
                                morse_char[i].splice(j, 1, "ᛌ❙");
                                break;
                            case "---":
                                morse_char[i].splice(j, 1, "ᛌ❚");
                                break;
                            case "----":
                                morse_char[i].splice(j, 1, "ᛌ❚❘");
                                break;
                            case "-----":
                                morse_char[i].splice(j, 1, "ᛌ❚❙");
                                break;
                            case "------":
                                morse_char[i].splice(j, 1, "ᛌ❚❚");
                                break;
                            case "·":
                                morse_char[i].splice(j, 1, "ᛧ❘");
                                break;
                            case "··":
                                morse_char[i].splice(j, 1, "ᛧ❙");
                                break;
                            case "···":
                                morse_char[i].splice(j, 1, "ᛧ❚");
                                break;
                            case "····":
                                morse_char[i].splice(j, 1, "ᛧ❚❘");
                                break;
                            case "·····":
                                morse_char[i].splice(j, 1, "ᛧ❚❙");
                                break;
                            case "······":
                                morse_char[i].splice(j, 1, "ᛧ❚❚");
                                break;
                            default:
                                break;
                        }
                    }
                    if (morse_char[i][0].charAt(0) === "ᛌ" || morse_char[i][0].charAt(0) === "ᛧ") {
                        morse_char[i].unshift("❙");
                    }
                }
            }
            result = morse_char.join(" ").replace(/,/g, "").replace(/ \n /g, "\n");
            break;
        default:
            break;
    }
    return result.trim();
}

function Decode(version: string, data: string): string {
    let result: string = "";
    switch (version) {
        case "morse code":
            result = MorseConvert("decode", data.replace(/\n/g, " \n ").toUpperCase().split(" ")).join("");
            break;
        default:
            break;
    }
    return result.trim();
}


export default function App(): JSX.Element {

    const [version, setVersion] = React.useState("morse code");
    const HandleVersionChange = (event: SelectChangeEvent) => {
        setVersion(event.target.value);
        if (text !== "") {
            setCipher(Encode(event.target.value, text));
        }
        else {
            setText(Decode(event.target.value, cipher));
        }
    };

    const [text, setText] = React.useState<string>("");
    const HandleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
        setCipher(Encode(version, event.target.value));

    };

    const [cipher, setCipher] = React.useState<string>("");
    const HandleCipherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCipher(event.target.value);
        setText(Decode(version, event.target.value));
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
                                        defaultValue={"morse code"}
                                        onChange={HandleVersionChange}
                                        sx={{
                                            width: "366px",
                                            marginX: "auto"
                                        }}
                                    >
                                        <MenuItem value={"morse code"}>morse code</MenuItem>
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
                                    sx={{
                                        width: "366px"
                                    }}
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