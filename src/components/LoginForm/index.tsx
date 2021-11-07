import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { IUserInfo } from '../../common/interfaces';
import { connect } from 'react-redux';
import handleInitialData from '../../actions/shared';
import { handleReceiveUserList } from '../../actions/users';
import { setAuthedUser } from '../../actions/authedUser';

const LoginForm = ({ dispatch, users, onLogin }) => {
  const userList: IUserInfo[] = Object.values(users);
  const [selectedUser, setSelectedUser] = React.useState('');
  const [hasError, setHasError] = React.useState(false);

  const handleUserChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setSelectedUser(value);
    setHasError(value === '');
  };

  const handleLogin = () => {
    setHasError(selectedUser === '');
    if (selectedUser) {
      dispatch(setAuthedUser(users[selectedUser].id));
      dispatch(handleInitialData());
      onLogin && onLogin();
    }
  };

  useEffect(() => {
    dispatch(handleReceiveUserList());
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ my: 2 }}>
        <FormControl fullWidth error={hasError} required>
          <InputLabel id="userLabel">User</InputLabel>
          <Select
            error={hasError}
            disabled={userList.length === 0}
            labelId="userLabel"
            value={selectedUser}
            label="User"
            onChange={handleUserChange}>
            {userList
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((user: IUserInfo) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
          </Select>
          {hasError && <FormHelperText>User is required</FormHelperText>}
        </FormControl>
      </Box>
      <Box>
        <Button
          fullWidth
          size="large"
          type="button"
          variant="contained"
          disabled={userList.length === 0}
          onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { users: state.users };
};

export default connect(mapStateToProps)(LoginForm);
