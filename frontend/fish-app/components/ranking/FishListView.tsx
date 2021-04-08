import React, { Component } from "react";
import { Icon, Picker, Form } from "native-base";
import { AntDesign } from "@expo/vector-icons";

export default class FishListView extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      selected: 1,
    };
  }
  onValueChange(value: number) {
    this.setState({
      selected: value,
    });
    this.props.setSelected(value);
  }
  render() {
    return (
      <Form style={{ width: "90%", alignSelf: "center", alignItems: "center" }}>
        <Picker
          mode="dropdown"
          iosHeader="어종을 선택해주세요."
          iosIcon={
            <AntDesign name="down"></AntDesign>
          }
          style={{ width: 300, justifyContent: "center" }}
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange.bind(this)}
        >
          <Picker.Item key="1" label="광어" value={1} />
          <Picker.Item key="2" label="참돔" value={2} />
          <Picker.Item key="3" label="우럭" value={3} />
          <Picker.Item key="4" label="붕어" value={4} />
          <Picker.Item key="5" label="쏘가리" value={5} />
          <Picker.Item key="6" label="배스" value={6} />
        </Picker>
      </Form>
    );
  }
}
