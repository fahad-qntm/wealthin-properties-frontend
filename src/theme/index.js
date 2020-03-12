import {createMuiTheme} from '@material-ui/core/styles'

const getTheme = theme => {
    const lightTheme = {
        overrides: {
            MuiTableRow:{
                head:{
                    backgroundColor: '#3f51b5',
                }
            },
            MuiTableCell:{
                head:{
                    color: '#fff'
                }
            },
            MuiDivider:{
                root:{
                    backgroundColor:  'rgba(0,0,0,0.5)',
                }
            }
        }
    }
    const darkTheme = {
        overrides: {
            MuiPaper: {
                root: {
                    backgroundColor: '#180f2d'
                }
            },
            MuiAppBar:{
                colorPrimary: {
                    backgroundColor:'#180f2d'
                }
            },
            MuiTableRow:{
                head:{
                    backgroundColor:'#2c1952'
                }
            },
            MuiTableCell:{
                head:{
                    color: '#fff'
                }
            },
            MuiInputBase:{
                focused:{
                    backgroundColor: '#120b21'
                }
            },
            MuiDivider:{
                root:{
                    backgroundColor: 'rgba(255,255,255,0.2)'
                }
            }
        },
        palette: {
            type: theme.paletteType,
            types: {
                dark: {
                    background: {
                        default: "#120b21"
                    }
                },
                light: {
                    background: {
                        default: "#ffffff"
                    }
                }
            },
            background: {
                default: '#120b21' ,
            },
            primary: {
                light: '#7c61ac',
                main: '#47267f',
                dark: '#20064b',
                contrastText: '#fff'
            },
            secondary: {
                light: '#ffe592',
                main: '#f8d66a',
                dark: '#d8b542',
                contrastText: '#000'
            },
            paper: {
                light: '#3d4261',
                main: '#262B49',
                dark: '#181d3b',
                contrastText: '#fff'
            }
        }

    }
    return createMuiTheme(theme.paletteType==='dark'?darkTheme:lightTheme)
}

export default getTheme({
    paletteType: 'dark'
})