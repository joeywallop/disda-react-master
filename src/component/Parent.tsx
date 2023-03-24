import { Component, ReactNode } from "react";
type Props = {
  children: ReactNode;
};

export class Parent extends Component<Props> {
  render(): ReactNode {
    return (
      <div>
        <h1>Parent Title</h1>
        {this.props.children}
      </div>
    );
  }
}
