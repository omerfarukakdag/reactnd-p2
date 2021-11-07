import {
  Avatar,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { IUser, IUserInfo } from '../../../common/interfaces';
import React, { useState } from 'react';
import { applySortFilter, getComparator } from '../../../utils/helpers';

import Badge from '@mui/material/Badge';
import Scrollbar from '../../../components/Scrollbar';
import TableHead from '../../../components/TableHead';
import { connect } from 'react-redux';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.dark,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const TABLE_HEAD_CONFIG = [
  { id: 'total', label: 'SCORE', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'answerCount', label: 'Answered Questions', alignRight: false },
  { id: 'questionCount', label: 'Created Questions', alignRight: false },
];

const Leaderboard = ({ leaderboardData }) => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('total');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - leaderboardData.length) : 0;
  const filteredUsers = applySortFilter(leaderboardData, getComparator(order, orderBy), '');

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Leaderboard
        </Typography>
      </Stack>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD_CONFIG}
                rowCount={leaderboardData.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const { id, name, avatarURL, answerCount, questionCount, total, topThree } = row;

                  return (
                    <TableRow hover key={id} tabIndex={-1}>
                      <TableCell align="left">
                        {topThree ? (
                          <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot">
                            <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 'bold', width: 48, height: 48 }}>
                              <Typography variant="h4">{total}</Typography>
                            </Avatar>
                          </StyledBadge>
                        ) : (
                          <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 'bold', width: 48, height: 48 }}>
                            <Typography variant="h4">{total}</Typography>
                          </Avatar>
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={name} src={avatarURL} sx={{ width: 48, height: 48 }} />
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Avatar sx={{ bgcolor: 'primary.darker' }}>{answerCount}</Avatar>
                      </TableCell>
                      <TableCell align="left">
                        <Avatar sx={{ bgcolor: 'primary.darker' }}>{questionCount}</Avatar>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={leaderboardData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const users: IUser = state.users;

  const leaderboardData = Object.values(users)
    .map((user: IUserInfo) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answerCount: Object.values(user.answers).length,
      questionCount: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length,
      topThree: false,
    }))
    .sort((a, b) => b.total - a.total);

  const topThree = leaderboardData.slice(0, 3);

  leaderboardData.forEach((item, index) => {
    const dataItem = topThree.find((subItem) => subItem.id === item.id);
    if (dataItem) {
      leaderboardData[index].topThree = true;
    }
  });

  return {
    leaderboardData,
  };
};

export default connect(mapStateToProps)(Leaderboard);
