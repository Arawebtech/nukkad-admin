'use client';

import * as React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { updateProfile } from '@/redux/features/authSlice';
import { updateAdmin, updatePassword } from '@/api/adminApi';

export default function AccountDetailsForm({ admin }: any): React.JSX.Element {
  const dispatch = useDispatch();

  /* ================= PROFILE STATE ================= */
  const [profile, setProfile] = React.useState({
    name: '',
    phone: '',
    companyName: '',
    address: '',
  });

  /* ================= PASSWORD STATE ================= */
  const [password, setPassword] = React.useState({
    email: '',
    oldPassword: '',
    newPassword: '',
  });

  const [confirmOpen, setConfirmOpen] = React.useState(false);
const [pendingPassword, setPendingPassword] = React.useState<any>(null);

  const [error, setError] = React.useState('');
const [success, setSuccess] = React.useState('');

  /* ================= FILE STATE ================= */
  const [files, setFiles] = React.useState<{
    companyLogo?: File;
    userDp?: File;
  }>({});


const [preview, setPreview] = React.useState<{
  companyLogo?: string;
  userDp?: string;
}>({});

  /* ================= PREFILL ================= */
React.useEffect(() => {
  if (admin) {
    setProfile({
      name: admin.name || '',
      phone: admin.phone || '',
      companyName: admin.companyName || '',
      address: admin.address || '',
    });

    setPreview({
      companyLogo: admin?.companyLogo?.url || '',
      userDp: admin?.userDp?.url || '',
    });
  }
}, [admin]);

  /* ================= HANDLERS ================= */
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, files: fileList } = e.target;

  if (!fileList?.length) return;

  const file = fileList[0];

  // store file for upload
  setFiles((prev) => ({
    ...prev,
    [name]: file,
  }));

  // LIVE PREVIEW 👇
  const previewUrl = URL.createObjectURL(file);

  setPreview((prev) => ({
    ...prev,
    [name]: previewUrl,
  }));
};

  /* ================= UPDATE PROFILE ================= */
const handleProfileSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append('name', profile.name);
    formData.append('phone', profile.phone);
    formData.append('companyName', profile.companyName);
    formData.append('address', profile.address);

    // if (files.companyLogo) {
    //   formData.append('companyLogo', files.companyLogo);
    // }

    // if (files.userDp) {
    //   formData.append('userDp', files.userDp);
    // }

    const res = await updateAdmin(formData);

    dispatch(updateProfile(res.admin));

    setSuccess(res.message || 'Profile updated successfully');
  } catch (err: any) {
    setError(err?.response?.data?.message || 'Something went wrong');
  }
};

  /* ================= UPDATE PASSWORD ================= */
const handlePasswordSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // ✅ VALIDATION FIRST
  if (
    !password.email ||
    !password.oldPassword ||
    !password.newPassword
  ) {
    setError('All fields are required');
    return;
  }

  setPendingPassword({ ...password });
  setConfirmOpen(true);
};
const confirmPasswordUpdate = async () => {
  try {
    const res = await updatePassword(pendingPassword);

    setSuccess(res.message || 'Password updated successfully');


    setPassword({
      email: '',
      oldPassword: '',
      newPassword: '',
    });

    setConfirmOpen(false);
    setPendingPassword(null);
  } catch (err: any) {
    setError(err?.response?.data?.message || 'Password update failed');
  }
};

  return (
    <Stack spacing={3}>

      {/* ================= IMAGES ================= */}
      {/* <Card>
        <CardHeader title="Images" />
        <Divider />

        <CardContent>
     <Grid container spacing={3}>


  <Grid size={{ xs: 12, md: 6 }}>
    <img
      src={preview.companyLogo || '/placeholder.png'}
      style={{
        width: 120,
        height: 120,
        borderRadius: 10,
        objectFit: 'cover',
      }}
    />

    <input
      type="file"
      name="companyLogo"
      accept="image/*"
      onChange={handleFileChange}
    />
  </Grid>


  <Grid size={{ xs: 12, md: 6 }}>
    <img
      src={preview.userDp || '/placeholder.png'}
      style={{
        width: 120,
        height: 120,
        borderRadius: '50%',
        objectFit: 'cover',
      }}
    />

    <input
      type="file"
      name="userDp"
      accept="image/*"
      onChange={handleFileChange}
    />
  </Grid>

</Grid>
        </CardContent>
      </Card> */}

      {/* ================= PROFILE ================= */}
      <form onSubmit={handleProfileSubmit}>
        <Card>
          <CardHeader title="Profile Details" />
          <Divider />

          <CardContent>
            <Grid container spacing={3}>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Name</InputLabel>
                  <OutlinedInput
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                  />
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Phone</InputLabel>
                  <OutlinedInput
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                  />
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Company Name</InputLabel>
                  <OutlinedInput
                    name="companyName"
                    value={profile.companyName}
                    onChange={handleProfileChange}
                  />
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Address</InputLabel>
                  <OutlinedInput
                    name="address"
                    value={profile.address}
                    onChange={handleProfileChange}
                  />
                </FormControl>
              </Grid>

            </Grid>
          </CardContent>

          <Divider />

          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained">
              Update Profile
            </Button>
          </CardActions>
        </Card>
      </form>

      {/* ================= PASSWORD ================= */}
      <form onSubmit={handlePasswordSubmit}>
        <Card>
          <CardHeader title="Change Password" />
          <Divider />

          <CardContent>
            <Stack spacing={3}>

              <FormControl fullWidth>
                <InputLabel>Email</InputLabel>
                <OutlinedInput
                  name="email"
                  value={password.email}
                  onChange={handlePasswordChange}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Old Password</InputLabel>
                <OutlinedInput
                  type="password"
                  name="oldPassword"
                  onChange={handlePasswordChange}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>New Password</InputLabel>
                <OutlinedInput
                  type="password"
                  name="newPassword"
                  onChange={handlePasswordChange}
                />
              </FormControl>

            </Stack>
          </CardContent>

          <Divider />

          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained">
              Update Password
            </Button>
          </CardActions>
        </Card>
      </form>

{/* ERROR */}
<Snackbar
  open={!!error}
  autoHideDuration={3000}
  onClose={() => setError('')}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
>
  <Alert severity="error" variant="filled" onClose={() => setError('')}>
    {error}
  </Alert>
</Snackbar>

{/* SUCCESS */}
<Snackbar
  open={!!success}
  autoHideDuration={3000}
  onClose={() => setSuccess('')}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
>
  <Alert severity="success" variant="filled" onClose={() => setSuccess('')}>
    {success}
  </Alert>
</Snackbar>

<Dialog
  open={confirmOpen}
  onClose={() => setConfirmOpen(false)}
>
  <DialogTitle>Confirm Password Update</DialogTitle>

  <DialogContent>
    <Typography>
      Are you sure you want to update your password?
    </Typography>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setConfirmOpen(false)}>
      Cancel
    </Button>

    <Button
      color="warning"
      variant="contained"
      onClick={confirmPasswordUpdate}
    >
      Yes, Update
    </Button>
  </DialogActions>
</Dialog>
    </Stack>
    
    
  );
}