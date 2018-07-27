import { QueueItem } from '../../../redux/state/queue';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from '../../../redux/state';
import { Action, skipToPosition } from '../../../redux/actions';
import { nowPlaying as nowPlayingSelector } from '../../../redux/selectors/nowPlaying';

interface StateEnhancedProps {
  items: QueueItem[];
  nowPlayingId?: string;
}

interface ActionEnhancedProps {
  skipToPosition: (position: number) => void;
}

export interface ChildProps extends StateEnhancedProps, ActionEnhancedProps {}

type ChildrenFn = (props: ChildProps) => React.ReactElement<any> | null;

interface OwnProps {
  children: ChildrenFn;
}

interface MergedProps
  extends OwnProps,
    StateEnhancedProps,
    ActionEnhancedProps {}

const enhancer = connect<
  StateEnhancedProps,
  ActionEnhancedProps,
  OwnProps,
  MergedProps,
  State
>(
  ({ queue }) => {
    const nowPlaying = nowPlayingSelector(queue);

    return { nowPlayingId: nowPlaying && nowPlaying.id, items: queue.items };
  },
  (dispatch: Dispatch<Action>): ActionEnhancedProps => ({
    skipToPosition: (position: number) => {
      dispatch(skipToPosition(position));
    },
  }),
  (
    stateProps: StateEnhancedProps,
    actionProps: ActionEnhancedProps,
    ownProps: OwnProps
  ) => ({
    ...stateProps,
    ...actionProps,
    ...ownProps,
  })
);

const Component = ({ children, ...props }: MergedProps) => children(props);

export const QueueState = enhancer(Component);
