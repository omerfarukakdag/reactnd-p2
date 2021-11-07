import Autocomplete from './Autocomplete';
import Backdrop from './Backdrop';
import Button from './Button';
import Card from './Card';
import IconButton from './IconButton';
import Input from './Input';
import Lists from './Lists';
import Paper from './Paper';
import Tooltip from './Tooltip';
import Typography from './Typography';
import { merge } from 'lodash';

const ComponentsOverrides = (theme) =>
  merge(
    Card(theme),
    Lists(theme),
    Paper(theme),
    Input(theme),
    Button(theme),
    Tooltip(theme),
    Backdrop(theme),
    Typography(theme),
    IconButton(theme),
    Autocomplete(theme),
  );

export default ComponentsOverrides;
