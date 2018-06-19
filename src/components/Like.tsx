import * as React from 'react';

import Heart from './icons/Heart';
import * as styles from './Like.css';

interface Props {
  onToggleLike: () => void;
  like: boolean;
}

const Like = ({ onToggleLike, like }: Props) => (
  <div
    className={[styles.container, like ? styles.liked : ''].join(' ')}
    onClick={onToggleLike}
  >
    <Heart svgClass={styles.heartContainer} fillPathClass={styles.fill} />
  </div>
);

export default Like;