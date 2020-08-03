import { Action, action } from 'easy-peasy';

export interface NetWorkStatusModel {
  netWorkStatus: boolean;
  setNetWorkStatus: Action<NetWorkStatusModel, boolean>;
}

const NetWorkStatus: NetWorkStatusModel = {
  netWorkStatus: false,
  setNetWorkStatus: action((state, status) => {
    state.netWorkStatus = status;
  })
};

export default NetWorkStatus;
