import React from 'react';
import alertMessages from '../common/alertMessages';
import { toast } from 'react-toastify';

const durationInMs = { short: 2000, default: 3000, medium: 5000, long: 7000 };

const useAlert = () => {
  return {
    alert: {
      success: (message, duration = 'default') => toast.success(message, { autoClose: durationInMs[duration] }),
      info: (message, duration = 'default') => toast.info(message, { autoClose: durationInMs[duration] }),
      error: (message, duration = 'default') => toast.error(message, { autoClose: durationInMs[duration] }),
      warning: (message, duration = 'default') => toast.warning(message, { autoClose: durationInMs[duration] }),
    },
    alertMessages,
  };
};

export default useAlert;
