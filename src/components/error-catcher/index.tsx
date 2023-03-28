import { Result } from 'antd';
import type { ReactNode } from 'react';
import React from 'react';

type ErrorCatcherProps = {
  errorNode?: React.ReactNode;
  errorNodeRender?: (errMsg: NonNullable<ErrorCatcherState['errorMsg']>) => React.ReactNode;
};

type ErrorCatcherState = {
  error: boolean;
  errorMsg?: any;
};

export default class Index extends React.Component<
  React.PropsWithChildren<ErrorCatcherProps>,
  ErrorCatcherState
> {
  state: Readonly<ErrorCatcherState> = { error: false };
  constructor(
    props:
      | React.PropsWithChildren<ErrorCatcherProps>
      | Readonly<React.PropsWithChildren<ErrorCatcherProps>>,
  ) {
    super(props);
  }

  componentDidCatch(err: any) {
    this.setState({ error: true, errorMsg: err });
  }

  render(): ReactNode {
    const { error, errorMsg } = this.state;
    const { errorNode, errorNodeRender } = this.props;

    let msg: string = '发生了错误,请联系管理员';
    if (errorMsg instanceof DOMException) msg = errorMsg.message;
    if (errorMsg instanceof Error) msg = errorMsg.message;

    return error
      ? errorNode || errorNodeRender?.(errorMsg) || <Result status="error" subTitle={msg} />
      : this.props.children;
  }
}
