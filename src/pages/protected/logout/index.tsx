import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authedUser';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

const Logout = ({ dispatch }) => {
  const history = useHistory();

  useEffect(() => {
    dispatch(logoutUser());
    history.push('/');
  }, []);

  return null;
};

export default connect()(Logout);
