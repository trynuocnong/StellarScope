import {DefaultError} from '@tanstack/react-query';

export interface MissionPlaceholderProps {
  isPending: boolean;
  isError: boolean;
  error: DefaultError | null;
  refresh: () => void;
}
