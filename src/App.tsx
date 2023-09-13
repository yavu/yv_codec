import React from 'react';
import { ReactNode } from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Divider, FormControl, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { morse_table } from './const';

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

/*
function morse_convert(mode: string, type: string, data: string[]): string[] {

    const intl_table: string[][] = [
        ["A", "Ａ", "·-", "i"],
        ["B", "Ｂ", "-···", "i"],
        ["C", "Ｃ", "-·-·", "i"],
        ["D", "Ｄ", "-··", "i"],
        ["E", "Ｅ", "·", "i"],
        ["F", "Ｆ", "··-·", "i"],
        ["G", "Ｇ", "--·", "i"],
        ["H", "Ｈ", "····", "i"],
        ["I", "Ｉ", "··", "i"],
        ["J", "Ｊ", "·---", "i"],
        ["K", "Ｋ", "-·-", "i"],
        ["L", "Ｌ", "·-··", "i"],
        ["M", "Ｍ", "--", "i"],
        ["N", "Ｎ", "-·", "i"],
        ["O", "Ｏ", "---", "i"],
        ["P", "Ｐ", "·--·", "i"],
        ["Q", "Ｑ", "--·-", "i"],
        ["R", "Ｒ", "·-·", "i"],
        ["S", "Ｓ", "···", "i"],
        ["T", "Ｔ", "-", "i"],
        ["U", "Ｕ", "··-", "i"],
        ["V", "Ｖ", "···-", "i"],
        ["W", "Ｗ", "·--", "i"],
        ["X", "Ｘ", "-··-", "i"],
        ["Y", "Ｙ", "-·--", "i"],
        ["Z", "Ｚ", "--··", "i"]
    ]

    const jp_table: string[][] = [
        ["あ", "ｱ", "--·--", "j"],
        ["い", "ｲ", "·-", "j"],
        ["う", "ｳ", "··-", "j"],
        ["え", "ｴ", "-·---", "j"],
        ["お", "ｵ", "·-···", "j"],
        ["か", "ｶ", "·-··", "j"],
        ["き", "ｷ", "-·-··", "j"],
        ["く", "ｸ", "···-", "j"],
        ["け", "ｹ", "-·--", "j"],
        ["こ", "ｺ", "----", "j"],
        ["さ", "ｻ", "-·-·-", "j"],
        ["し", "ｼ", "--·-·", "j"],
        ["す", "ｽ", "---·", "j"],
        ["せ", "ｾ", "·---·", "j"],
        ["そ", "ｿ", "---·", "j"],
        ["た", "ﾀ", "-·", "j"],
        ["ち", "ﾁ", "··-·", "j"],
        ["つ", "ﾂ", "·--·", "j"],
        ["て", "ﾃ", "·-·--", "j"],
        ["と", "ﾄ", "··-··", "j"],
        ["な", "ﾅ", "·-·", "j"],
        ["に", "ﾆ", "-·-·", "j"],
        ["ぬ", "ﾇ", "····", "j"],
        ["ね", "ﾈ", "--·-", "j"],
        ["の", "ﾉ", "··--", "j"],
        ["は", "ﾊ", "-···", "j"],
        ["ひ", "ﾋ", "--··-", "j"],
        ["ふ", "ﾌ", "--··", "j"],
        ["へ", "ﾍ", "·", "j"],
        ["ほ", "ﾎ", "-··", "j"],
        ["ま", "ﾏ", "-··-", "j"],
        ["み", "ﾐ", "··-·-", "j"],
        ["む", "ﾑ", "-", "j"],
        ["め", "ﾒ", "-···-", "j"],
        ["も", "ﾓ", "-··-·", "j"],
        ["や", "ﾔ", "·--", "j"],
        ["ゆ", "ﾕ", "-··--", "j"],
        ["よ", "ﾖ", "--", "j"],
        ["ら", "ﾗ", "···", "j"],
        ["り", "ﾘ", "--·", "j"],
        ["る", "ﾙ", "-·--·", "j"],
        ["れ", "ﾚ", "---", "j"],
        ["ろ", "ﾛ", "·-·-", "j"],
        ["わ", "ﾜ", "-·-", "j"],
        ["ゐ", "ゐ", "·-··-", "j"],
        ["ゑ", "ゑ", "·--··", "j"],
        ["を", "ｦ", "·---", "j"],
        ["ん", "ﾝ", "·-·-·", "j"],

        ["゙", "゛", "··", "j"],
        ["゚", "゜", "··--·", "j"],
        ["ー", "ー", "·--·-", "j"],
        ["、", ",", "·-·-·-", "j"]
    ]

    let table: string[][] = [
        ["0", "０", "-----", "o"],
        ["1", "１", "·----", "o"],
        ["2", "２", "··---", "o"],
        ["3", "３", "···--", "o"],
        ["4", "４", "····-", "o"],
        ["5", "５", "·····", "o"],
        ["6", "６", "-····", "o"],
        ["7", "７", "--···", "o"],
        ["8", "８", "---··", "o"],
        ["9", "９", "----·", "o"],
        ["(", "（", "-·--·-", "o"],
        [")", "）", "·-··-·", "o"],
        [" ", "　", ""],
        ["\n", "\n", "\n"]
    ];

    if (type === "intl") {
        table = table.concat(intl_table);
    }
    else if (type === "jp") {
        table = table.concat(jp_table);
    }

    if (mode === "encode") {
        return data.map((e) =>
            (table.find(([k1, k2]) => (k1 === e) || (k2 === e))?.[3] ?? "") + (table.find(([k1, k2]) => (k1 === e) || (k2 === e))?.[2] ?? "⛝")
        )
    }
    else if (mode === "decode") {
        return data.map((e) =>
            table.find(([, , k]) => k === e)?.[0] ?? "⛝"
        )
    }
    else {
        return [];
    }
}

function encode(version: string, data: string): string {
    let data_array: string[] = katakana_to_hiragana(data).toUpperCase().normalize("NFD").split("");//.map(v => v === "\u3099" ? "゛" : v).map(v => v === "\u309A" ? "゜" : v);
    let result: string[] = [];
    let anchor: number = 0;
    let mode: string = "jp";
    switch (version) {
        case "morse_code_intl":
            return morse_convert("encode", "intl", data.toUpperCase().split("")).join(" ").replace(/ \n |\n | \n/g, "\n").replace(/[ijo]/g, "").trim();

        case "morse_code_jp":
            for (let i = 0; i < data_array.length; i++) {
                if (mode === "jp") {
                    if (data_array[i] === "(" || data_array[i] === "（") {
                        result = result.concat(morse_convert("encode", "jp", data_array.slice(anchor, i + 1)));
                        anchor = i + 1;
                        mode = "intl";
                    }
                }
                else if (mode === "intl") {
                    if (data_array[i] === ")" || data_array[i] === "）") {
                        result = result.concat(morse_convert("encode", "intl", data_array.slice(anchor, i)));
                        anchor = i;
                        mode = "jp";
                    }
                }

                if (i + 1 === data_array.length) {
                    result = result.concat(morse_convert("encode", mode, data_array.slice(anchor)));
                }
            }
            return result.join(" ").replace(/ \n |\n | \n/g, "\n").replace(/[ijo]/g, "").trim();

        case "yv_wave_2023":
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

            let mask_array: string[] = data_array.map(e => e.replace(/[^A-Z]/g,"0").replace(/[A-Z]/g,"1"));
            for (let i = 0; i < data_array.length; i++) {
                if (mode === "jp") {
                    if (mask_array[i] === "1") {
                        result = result.concat(morse_convert("encode", "jp", data_array.slice(anchor, i))
                            .map(e => replaces.reduce((a, [f, t]) => a.replace(f, t), e))
                        );
                        anchor = i;
                        mode = "intl";
                    }
                }
                else if (mode === "intl") {
                    if (mask_array[i] === "0") {
                        result = result.concat(morse_convert("encode", "intl", data_array.slice(anchor, i))
                            .map(e => replaces.reduce((a, [f, t]) => a.replace(f, t), e))
                        );
                        anchor = i;
                        mode = "jp";
                    }
                }

                if (i + 1 === data_array.length) {
                    result = result.concat(morse_convert("encode", mode, data_array.slice(anchor))
                        .map(e => replaces.reduce((a, [f, t]) => a.replace(f, t), e))
                    );
                }
            }
            return result.join(" ")
                .replace(/ \n |\n | \n/g, "\n")
                .replace(/i/g, "❚")
                .replace(/j/g, "❘")
                .replace(/o/g, "❙")
                .trim();

        default:
            return "";
    }
}

function decode(version: string, data: string): string {
    switch (version) {
        case "morse_code_intl":
            return morse_convert("decode", "intl", data.replace(/\n/g, " \n ").toUpperCase().split(" ")).join("").replace(/ \n |\n | \n/g, "\n").trim();

        case "morse_code_jp":
            let data_array: string[] = data.replace(/\n/g, " \n ").toUpperCase().split(" ");
            let result: string[] = [];
            let anchor: number = 0;
            let mode: string = "jp";
            for (let i = 0; i < data_array.length; i++) {
                if (mode === "jp") {
                    if (data_array[i] === "-·--·-") {
                        result = result.concat(morse_convert("decode", "jp", data_array.slice(anchor, i + 1)));
                        anchor = i + 1;
                        mode = "intl";
                    }
                }
                else if (mode === "intl") {
                    if (data_array[i] === "·-··-·") {
                        result = result.concat(morse_convert("decode", "intl", data_array.slice(anchor, i)));
                        anchor = i;
                        mode = "jp";
                    }
                }

                if (i + 1 === data_array.length) {
                    result = result.concat(morse_convert("decode", mode, data_array.slice(anchor)));
                }
            }
            //console.log("がぎぐあご".normalize("NFD").replace(/"(\u3099|\u309A)"/g, (e) => {return String.fromCharCode(e.charCodeAt(0) + 0x02)}));
            return result.join("")
                .normalize("NFC")
                .replace(/ \n |\n | \n/g, "\n")
                .trim();

        case "yv_wave_2023":
            const replaces: [RegExp, string][] = [
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

            return decode("morse_code_jp", data.replace(/\n/g, " \n ").split(" ").map(e => replaces.reduce((a, [f, t]) => a.replace(f, t), e)).join(" ").replace(/ \n |\n | \n/g, "\n").replace(/[❘❙❚]/g, ""));

        default:
            return "";
    }
}
*/

// 片仮名を平仮名に変換
function katakana_to_hiragana(str: string): string {
    return str.replace(/[\u30A1-\u30F6]/g, function (match) {
        return String.fromCharCode(match.charCodeAt(0) - 0x60);
    });
}

// 全角英数字を半角に変換
function zenkaku_to_hankaku(str: string): string {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (match) {
        return String.fromCharCode(match.charCodeAt(0) - 0xFEE0);
    });
}

interface Codec {
    encode(): string;
    decode(): string;
}

class IntlMorseCodec implements Codec {
    encode(): string {
        return "";
    }
    decode(): string {
        return "";
    }
}

export default function App(): JSX.Element {

    const [type, setType] = React.useState("0");
    const HandleTypeChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
        if (text !== "") {
            //setCode(encode(event.target.value, text));
        }
        else {
            //setText(decode(event.target.value, code));
        }
    };

    const [text, setText] = React.useState<string>("");
    const HandleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
        //setCode(encode(type, event.target.value));

    };

    const [code, setCode] = React.useState<string>("");
    const HandleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
        //setText(decode(type, event.target.value));
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
                                        <MenuItem value={"0"}>Morse code (INTL)</MenuItem>
                                        <MenuItem value={"1"}>Morse code (JP)</MenuItem>
                                        <MenuItem value={"2"}>YV-Wave 2023</MenuItem>
                                        {/*
                                        <MenuItem value={"yv_code 2020"}>Yv-Code 2020</MenuItem>
                                        <MenuItem value={"yv_wave_2023"}>Yv-Wave 2023</MenuItem>
                                        <MenuItem value={"yv_strata 2023"}>Yv-Strata 2023</MenuItem>
                                        */}
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

