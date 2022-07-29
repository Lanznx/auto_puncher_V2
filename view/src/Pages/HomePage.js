import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Swal from 'sweetalert2';
import { addRecord, getMyRecord, signIn } from './API';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, type, theme) {
  return {
    fontWeight:
      type.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function HomePage() {
  const token = localStorage.getItem('token');
  if (token === null || token === undefined) {
    window.location.href = '/signIn';
  }
  const [workDays, setWorkDays] = React.useState([]);
  async function refresh() {
    const result = await getMyRecord();
    const data = result['data'];
    if (data !== null) {
      Swal.fire({
        title: 'Error',
        text: '您已經設定過了，若要更改設定請至個人頁面',
        icon: 'error',
        confirmButtonText: 'OK',
      }).then(() => {
        window.location.href = '/profile';
      });
      return false;
    }
    return true;
  }
  React.useEffect(() => {
    refresh();
  }, []);
  const theme = createTheme();
  const names = { 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五' };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      !data.get('sheetKey') ||
      !data.get('credential') ||
      !data.get('onWorkTime') ||
      !data.get('offWorkTime') ||
      !data.get('workHours') ||
      workDays.length === 0
    ) {
      Swal.fire({
        title: 'Error',
        text: '請填寫完整，缺一不可！我最愛喝可不可',
        icon: 'error',
        confirmButtonText: '好啦，我知道ㄌ...下次請你一杯',
      });
      return;
    }
    if (!data.get('onWorkTime').includes(':')) {
      Swal.fire({
        title: 'Error',
        text: '上班時間格式錯誤，請確定是 HH:mm',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    if (!data.get('offWorkTime').includes(':')) {
      Swal.fire({
        title: 'Error',
        text: '下班時間格式錯誤，請確定是 HH:mm',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    try {
      const creds = JSON.parse(data.get('credential'));
      const correctData = {
        type: '',
        auth_uri: '',
        client_id: '',
        token_uri: '',
        project_id: '',
        private_key: '',
        client_email: '',
        private_key_id: '',
        client_x509_cert_url: '',
        auth_provider_x509_cert_url: '',
      };
      Object.keys(correctData).map((key) => {
        if (!creds[key]) throw new Error();
      });
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: '憑證無效，請重新複製一次',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    const credential = JSON.parse(data.get('credential'));
    const result = await addRecord(
      data.get('sheetKey'),
      credential,
      data.get('onWorkTime'),
      data.get('offWorkTime'),
      data.get('workHours'),
      workDays.join(','),
    );
    if (result.success) {
      Swal.fire({
        title: 'Success',
        text: result.message,
        icon: 'success',
        confirmButtonText: 'OK',
      });
      window.location.href = '/profile';
    } else if (result.code === 1032) {
      Swal.fire({
        title: 'Error',
        text: '請先登入',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: result.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ boxShadow: 0 }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              填寫您的資料
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="sheetKey"
                label="sheetKey"
                name="sheetKey"
                autoComplete="sheetKey"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="credential"
                label="credential"
                type="credential"
                id="credential"
                autoComplete="current-credential"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="onWorkTime"
                label="上班時間（例： 9:00）"
                type="text"
                id="onWorkTime"
                autoComplete="current-onWorkTime"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="offWorkTime"
                label="下班時間（例： 18:30）"
                type="text"
                id="offWorkTime"
                autoComplete="current-offWorkTime"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="workHours"
                label="一天上班時數（例： 8）"
                type="text"
                id="workHours"
                autoComplete="current-workHours"
              />

              <FormControl
                variant="outlined"
                margin="normal"
                required
                fullWidth
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  工作日
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  multiple
                  value={workDays}
                  onChange={(e) => {
                    setWorkDays(e.target.value);
                  }}
                  label="工作日"
                  input={<OutlinedInput labelWidth={200} />}
                  MenuProps={MenuProps}
                >
                  {Object.keys(names).map((key) => (
                    <MenuItem
                      key={key}
                      value={key}
                      style={getStyles(names[key], workDays, theme)}
                    >
                      {names[key]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="我同意將憑證給我最信任的工程師，他並不會做壞事。（就算他想做什麼，也只能動到試算表，權力超小ＱＱ）"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#D64550' }}
              >
                提交！開始我的自動打卡
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
