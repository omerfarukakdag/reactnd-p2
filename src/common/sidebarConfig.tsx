import * as PagePaths from '../router/paths';

import { HeaderInfo } from './headerConfig';
import { Icon } from '@iconify/react';
import React from 'react';
import homeIcon from '@iconify/icons-eva/home-outline';
import leaderBoardIcon from '@iconify/icons-eva/clipboard-outline';
import logOutIcon from '@iconify/icons-eva/log-out-outline';
import newQuestion from '@iconify/icons-eva/plus-outline';

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    path: PagePaths.Dashboard,
    icon: getIcon(homeIcon),
    title: HeaderInfo.Dashboard.title,
  },
  {
    path: PagePaths.Leaderboard,
    icon: getIcon(leaderBoardIcon),
    title: HeaderInfo.LeaderBoard.title,
  },
  {
    path: PagePaths.NewQuestion,
    icon: getIcon(newQuestion),
    title: HeaderInfo.NewQuestion.title,
  },
  {
    path: PagePaths.Logout,
    icon: getIcon(logOutIcon),
    title: HeaderInfo.Logout.title,
  },
];

export default sidebarConfig;
