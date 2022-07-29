import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Swal from 'sweetalert2';
import {
  addRecord,
  cancelSubscribe,
  getMyData,
  getMyRecord,
  startSubscribe,
  updateRecord,
} from './API';

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
export default function ProfilePage() {
  const token = localStorage.getItem('token');
  if (token === null || token === undefined) {
    window.location.href = '/signIn';
  }
  const [workDays, setWorkDays] = React.useState([]);
  const [onWorkTime, setOnWorkTime] = React.useState('');
  const [offWorkTime, setOffWorkTime] = React.useState('');
  const [sheetKey, setSheetKey] = React.useState('');
  const [workHours, setWorkHours] = React.useState('');
  const [credential, setCredential] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [canEdit, setCanEdit] = React.useState(false);
  let strings = token.split('.');
  const userinfo = JSON.parse(
    decodeURIComponent(
      escape(window.atob(strings[1].replace(/-/g, '+').replace(/_/g, '/'))),
    ),
  );
  const { username, email } = userinfo;

  async function refresh() {
    const result = await getMyRecord();
    const subscribeData = await getMyData();
    if (subscribeData) {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
    const data = result['data'];

    setWorkDays(data.crontabString.split(','));
    setOnWorkTime(data.onWorkTime);
    setOffWorkTime(data.offWorkTime);
    setSheetKey(data.sheetKey);
    setWorkHours(data.workHours);
    setCredential(JSON.stringify(data.credential));
  }
  React.useEffect(() => {
    refresh();
  }, []);

  const theme = createTheme();
  const weekdays = { 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五' };
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
    const result = await updateRecord(
      sheetKey,
      credential,
      onWorkTime,
      offWorkTime,
      workHours,
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
        <Grid item xs={false} sm={2} md={4} />
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
          <Typography component="h1" variant="h8" mt={5}>
            {username} 您好，歡迎來到您的個人頁面
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
            }}
          >
            <Typography component="h3" variant="h5">
              您的電子郵件：{email}
            </Typography>
            <Typography component="h3" variant="h5">
              您是否開啟服務：{isSubscribed ? '開啟✅' : '關閉🙅🏼‍♂️'}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Button
                variant="contained"
                sx={{ backgroundColor: '#D64550', width: '30%', margin: '1%' }}
                onClick={() => {
                  setCanEdit(!canEdit);
                }}
              >
                讓我編輯
              </Button>{' '}
              <Button
                variant="contained"
                color="success"
                sx={{ width: '30%', margin: '1%' }}
                onClick={async () => {
                  const result = await startSubscribe();
                  if (result) {
                    Swal.fire({
                      title: 'Success',
                      text: '已開啟',
                      icon: 'success',
                      confirmButtonText: 'OK',
                    });
                    refresh();
                  } else {
                    Swal.fire({
                      title: 'Error',
                      text: result.message,
                      icon: 'error',
                      confirmButtonText: 'OK',
                    });
                  }
                }}
              >
                開啟自動打卡
              </Button>
              <Button
                variant="contained"
                sx={{ width: '30%', margin: '1%' }}
                onClick={async () => {
                  const result = await cancelSubscribe();
                  if (result) {
                    Swal.fire({
                      title: 'Success',
                      text: '已取消',
                      icon: 'success',
                      confirmButtonText: 'OK',
                    });
                    refresh();
                  } else {
                    Swal.fire({
                      title: 'Error',
                      text: result.message,
                      icon: 'error',
                      confirmButtonText: 'OK',
                    });
                  }
                }}
              >
                取消自動打卡
              </Button>
              <TextField
                disabled={!canEdit}
                onChange={(e) => {
                  setSheetKey(e.target.value);
                }}
                margin="normal"
                required
                value={sheetKey}
                fullWidth
                id="sheetKey"
                label="sheetKey"
                name="sheetKey"
                autoComplete="sheetKey"
                autoFocus
              />
              <TextField
                disabled={!canEdit}
                margin="normal"
                onChange={(e) => {
                  setCredential(e.target.value);
                }}
                value={credential}
                required
                fullWidth
                name="credential"
                label="credential"
                type="credential"
                id="credential"
                autoComplete="current-credential"
              />
              <TextField
                disabled={!canEdit}
                value={onWorkTime}
                onChange={(e) => {
                  setOnWorkTime(e.target.value);
                }}
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
                disabled={!canEdit}
                margin="normal"
                onChange={(e) => {
                  setOffWorkTime(e.target.value);
                }}
                value={offWorkTime}
                required
                fullWidth
                name="offWorkTime"
                label="下班時間（例： 18:30）"
                type="text"
                id="offWorkTime"
                autoComplete="current-offWorkTime"
              />
              <TextField
                disabled={!canEdit}
                margin="normal"
                value={workHours}
                onChange={(e) => {
                  setWorkHours(e.target.value);
                }}
                required
                fullWidth
                name="workHours"
                label="一天上班時數（例： 8）"
                type="text"
                id="workHours"
                autoComplete="current-workHours"
              />
              <FormControl
                disabled={!canEdit}
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
                  {Object.keys(weekdays).map((key) => (
                    <MenuItem
                      key={key}
                      value={key}
                      style={getStyles(weekdays[key], workDays, theme)}
                    >
                      {weekdays[key]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                disabled={!canEdit}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#D64550' }}
              >
                更新資料
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
