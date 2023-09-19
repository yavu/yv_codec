import React from 'react';
import { ReactNode } from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Divider, FormControl, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { morse_table, yv_table } from './const';

const DarkTheme = createTheme({
    typography: {
        fontFamily: "Share Tech Mono",
        button: {
            fontWeight: 600,
        },
    },
    palette: {
        mode: "dark",
        primary: {
            main: "#00b0ff",
            contrastText: "#2a3648",
        },
        secondary: {
            main: "#ef6c00",
        },
        background: {
            default: "#101d31",
            paper: "#101d31",
        },
        error: {
            main: "#ff1744",
        },
    },
    spacing: 16,
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
            @font-face {
              font-family: 'Share Tech Mono';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url(https://fonts.gstatic.com/s/sharetechmono/v15/J7aHnp1uDWRBEqV98dVQztYldFcLowEF.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            `
        },
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.size === "medium" && {
                        boxSizing: "border-box",
                        height: "40px",
                        paddingTop: "8px",
                    })
                })
            }
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    boxSizing: "border-box",
                    height: "40px"
                }
            }
        }

    }
});

// 片仮名を平仮名に変換
function katakana_to_hiragana(str: string): string {
    return str.normalize("NFD").replace(/[\u30A1-\u30F6]/g, function (match) {
        return String.fromCharCode(match.charCodeAt(0) - 0x60).normalize("NFC");
    });
}

// 全角の英数字と記号を半角に変換
function zenkaku_to_hankaku(str: string): string {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９（）]/g, function (match) {
        return String.fromCharCode(match.charCodeAt(0) - 0xFEE0);
    });
}

// コーデックのインターフェース
interface Codec {
    name: string;
    encode(input: string): string;
    decode(input: string): string;
}

// 国際モールス符号のコーデック
class IntlMorseCodec implements Codec {
    name = "Morse code (INTL)";
    // エンコード
    encode(input: string): string {
        const unified_text = zenkaku_to_hankaku(input).toUpperCase();
        const chars = unified_text.split("");
        const morses = chars.map(e => morse_table.intl.find(([k,]) => (k === e))?.[1] ?? "⛝");
        const morse_text = morses.join(" ");
        return morse_text.replace(/ *\n */g, "\n").trim();
    }
    // デコード
    decode(input: string): string {
        const unified_text = input.toUpperCase();
        const morses = unified_text.replace(/\n/g, " \n ").split(" ");
        const chars = morses.map(e => morse_table.intl.find(([, k]) => (k === e))?.[0] ?? "⛝");
        const text = chars.join("");
        return text.replace(/ *\n */g, "\n").trim();
    }
}

// 和文モールス符号のコーデック
class JpMorseCodec implements Codec {
    name = "Morse code (JP)";
    // エンコード
    encode(input: string): string {
        const unified_text = katakana_to_hiragana(zenkaku_to_hankaku(input)).normalize("NFD").toUpperCase();
        const chars = unified_text.split("");
        const morses = [];
        const delimiter = ["(", ")"];
        for (let t = false, i = chars.includes(delimiter[0]) ? chars.indexOf(delimiter[0]) : chars.length; chars.length !== 0; t = !t, i = chars.includes(delimiter[Number(t)]) ? chars.indexOf(delimiter[Number(t)]) : chars.length) {
            morses.push(...chars.splice(0, i).map(e => (t ? morse_table.intl : morse_table.jp).find(([k,]) => (k === e))?.[1] ?? "⛝"));
        }
        const morse_text = morses.join(" ");
        return morse_text.replace(/ *\n */g, "\n").trim();
    }
    // デコード
    decode(input: string): string {
        const unified_text = input.toUpperCase();
        const morses = unified_text.replace(/\n/g, " \n ").split(" ");
        const chars = [];
        const delimiter = ["-·--·-", "·-··-·"];
        for (let t = false, i = morses.includes(delimiter[0]) ? morses.indexOf(delimiter[0]) : morses.length; morses.length !== 0; t = !t, i = morses.includes(delimiter[Number(t)]) ? morses.indexOf(delimiter[Number(t)]) : morses.length) {
            chars.push(...morses.splice(0, i).map(e => (t ? morse_table.intl : morse_table.jp).find(([, k]) => (k === e))?.[0] ?? "⛝"));
        }
        const text = chars.join("");
        return text.normalize("NFC").replace(/ *\n */g, "\n").trim();
    }
}

// YV-Wave 2023のコーデック
class YvWave2023Codec implements Codec {
    name = "YV-Wave 2023";
    // エンコード
    encode(input: string): string {
        const unified_text = katakana_to_hiragana(zenkaku_to_hankaku(input)).normalize("NFD").toUpperCase();
        const chars = unified_text.split("");
        const morses = chars.map(e => yv_table.yv_wave_2023.find(([k,]) => (k === e))?.[1] ?? "⛝");
        const code_text = morses.join(" ");
        return code_text.replace(/ *\n */g, "\n").trim();
    }
    // デコード
    decode(input: string): string {
        const unified_text = input.toUpperCase();
        const codes = unified_text.replace(/\n/g, " \n ").split(" ");
        const chars = codes.map(e => yv_table.yv_wave_2023.find(([, k]) => (k === e))?.[0] ?? "⛝");
        const text = chars.join("");
        return text.normalize("NFC").replace(/ *\n */g, "\n").trim();
    }
}

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
