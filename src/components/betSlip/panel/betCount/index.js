import React from 'react';
import { Badge } from '../../components';

function BetCountPanel({ onOpenBetSlipPanel, text, count }) {
  return <Badge onClick={onOpenBetSlipPanel} text={text} count={count} />;
}

BetCountPanel.defaultProps = {
  text: 'Bet Slip',
  count: 0,
  onOpenBetSlipPanel: () => {},
};

export default BetCountPanel;
