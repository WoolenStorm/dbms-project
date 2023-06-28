import { createTheme, ThemeProvider } from "@mui/material/styles"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

const Date = (props) => {
    const { placeholder } = props
    return (
        <div className="dateContainer">
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={placeholder}
                        format="DD.MM.YYYY"
                        sx={{
                            color: "red",
                            'MuiInputLabel-root.Mui-focused': { color: "#36FCC0" },
                            '.MuiOutlinedInput-notchedOutline': { borderColor: "#e7e4ed" },
                            '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: "#36FCC0" },
                            '.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: "#36FCC0" },
                            '.css-1yllih9-MuiPaper-root-MuiPickersPopper-paper': { backgroundColor: "#3B3955" },
                            '.css-w74tcc-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': { color: "#36FCC0" },
                        }}
                    />
                </LocalizationProvider>
            </ThemeProvider>
        </div>
    )
}

const theme = createTheme({
    components: {
        MuiIconButton: {
            styleOverrides: {
                sizeMedium: {
                    color: "#ADA3C2"
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    color: "#e7e4ed"
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: "#e7e4ed"
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    background: "#E7E4ED"
                }
            }
        }
    }
})

export default Date
