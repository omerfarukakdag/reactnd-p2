import { CSSProperties, ReactNode } from 'react';

export interface IGlobalState {
  globalState: {};
  setGlobalState: Function;
}

export interface IHeaderInfo {
  title: string;
  description: string;
}

export interface IHeaderConfig {
  [key: string]: IHeaderInfo;
}

export interface IRoute {
  path: string;
  exact: boolean;
  wrapper: React.ComponentClass<any> | React.FunctionComponent<any>;
  wrapperProps: {};
  component: React.ComponentClass<any> | React.FunctionComponent<any>;
  componentProps?: {};
  headerProps: IHeaderInfo;
}

export interface IMultiProviderProps {
  children: React.ReactNode;
  providers: React.ReactElement[];
}

export interface IStateData {
  questions: IQuestion;
  users: IUser;
}

export interface IAppProps {
  authedUser?: string;
}

interface IQuestionOption {
  votes: string[];
  text: string;
}

export interface IQuestionDetail {
  id: string;
  author: string;
  timestamp: number;
  optionOne: IQuestionOption;
  optionTwo: IQuestionOption;
}
export interface IQuestion {
  [key: string]: IQuestionDetail;
}

export type QuestionOption = 'optionOne' | 'optionTwo';

export interface IUserInfo {
  id: string;
  name: string;
  avatarURL: string;
  answers: {
    [key: string]: QuestionOption;
  };
  questions: string[];
}

export interface IUser {
  [key: string]: IUserInfo;
}

export type SortByType = 'latest' | 'oldest' | 'nameAsc' | 'nameDesc';

export interface ISortOptions {
  value: SortByType;
  label: string;
}

export type ViewTypes = 'answer' | 'results';

export interface ITabBase {
  title: string;
  index: number;
}

export interface ITabInfo {
  [key: string]: ITabBase;
}

export interface ITabContext {
  tabInfo: ITabBase;
  data: IQuestionDetail[];
  props: {
    answered: boolean;
  };
}

export interface ILocationParams<T> {
  from: {
    hash: string;
    pathname: string;
    search: string;
    state: T;
  };
}

export interface IPageProps {
  children: ReactNode;
  style?: CSSProperties;
}
