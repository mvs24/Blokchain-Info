export interface BlockDetail {
  bits: number;
  block_index: number;
  fee: number;
  hash: string;
  height: number;
  mrkl_root: string;
  n_tx: number;
  nonce: number;
  prev_block: string;
  size: number;
  time: number;
  tx: {
    block_height: number;
    block_index: number;
    double_spend: boolean;
    fee: number;
    hash: string;
    relayed_by: string;
    size: number;
    time: number;
    tx_index: number;
    weight: number;
  }[];
  ver: number;
  weight: number;
}
