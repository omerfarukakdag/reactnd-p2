import { Box, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

import { Icon } from '@iconify/react';
import debounce from 'lodash.debounce';
import filterIcon from '@iconify/icons-eva/funnel-outline';

const SearchQuestion = ({ onInputChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const debouncedChangeHandler = useMemo(() => debounce(() => onInputChange(searchQuery), 300), [searchQuery]);

  useEffect(() => {
    debouncedChangeHandler();

    return debouncedChangeHandler.cancel;
  }, [searchQuery, debouncedChangeHandler]);

  return (
    <TextField
      sx={{ maxWidth: 190 }}
      placeholder="Filter question..."
      InputProps={{
        value: searchQuery,
        onChange: handleQueryChange,
        startAdornment: (
          <InputAdornment position="start">
            <Box
              component={Icon}
              icon={filterIcon}
              sx={{
                ml: 1,
                width: 20,
                height: 20,
                color: 'text.disabled',
              }}
            />
          </InputAdornment>
        ),
        style: { padding: 0, height: 40 },
      }}
    />
  );
};

export default SearchQuestion;
