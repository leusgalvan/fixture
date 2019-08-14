import React from "react";
import { mount, shallow } from "enzyme";
import SelectableList from ".";
import { List, ListItemText, Typography } from "@material-ui/core";
import EmptyFeedbackImage from "../Common/EmptyFeedbackImage";

describe("SelectableList", () => {
  it("should show a message when there are no items", () => {
    const selectableList = shallow(<SelectableList />);
    expect(selectableList.find(List)).toBeUndefined;
    expect(selectableList.find(EmptyFeedbackImage)).toBeDefined;
    expect(
      selectableList
        .find(Typography)
        .first()
        .text()
    ).toEqual("No items to display");
  });

  it("should render list with 3 items", () => {
    const items = ["Ana", "Carlos", "Beatriz"];
    const selectableList = shallow(<SelectableList items={items} />);
    expect(selectableList.find(List)).toBeDefined;
    expect(selectableList.find(ListItemText)).toHaveLength(3);
  });

  it("should render list with no items selected", () => {
    const items = ["Ana", "Carlos", "Beatriz"];
    const selectableList = shallow(<SelectableList items={items} />);
    expect(
      selectableList
        .find(ListItemText)
        .at(0)
        .prop("selected")
    ).toBeFalsy;
    expect(
      selectableList
        .find(ListItemText)
        .at(1)
        .prop("selected")
    ).toBeFalsy;
    expect(
      selectableList
        .find(ListItemText)
        .at(2)
        .prop("selected")
    ).toBeFalsy;
  });

  it("should render list with first item selected", () => {
    const items = ["Ana", "Carlos", "Beatriz"];
    const selectedIndexes = [0];
    const selectableList = shallow(
      <SelectableList items={items} selectedIndexes={selectedIndexes} />
    );
    expect(
      selectableList
        .find(ListItemText)
        .at(0)
        .prop("selected")
    ).toBeTruthy;
    expect(
      selectableList
        .find(ListItemText)
        .at(1)
        .prop("selected")
    ).toBeFalsy;
    expect(
      selectableList
        .find(ListItemText)
        .at(2)
        .prop("selected")
    ).toBeFalsy;
  });

  it("should render list with second item selected", () => {
    const items = ["Ana", "Carlos", "Beatriz"];
    const selectedIndexes = [1];
    const selectableList = shallow(
      <SelectableList items={items} selectedIndexes={selectedIndexes} />
    );
    expect(
      selectableList
        .find(ListItemText)
        .at(0)
        .prop("selected")
    ).toBeFalsy;
    expect(
      selectableList
        .find(ListItemText)
        .at(1)
        .prop("selected")
    ).toBeTruthy;
    expect(
      selectableList
        .find(ListItemText)
        .at(2)
        .prop("selected")
    ).toBeFalsy;
  });

  it("should render list with third item selected", () => {
    const items = ["Ana", "Carlos", "Beatriz"];
    const selectedIndexes = [2];
    const selectableList = shallow(
      <SelectableList items={items} selectedIndexes={selectedIndexes} />
    );
    expect(
      selectableList
        .find(ListItemText)
        .at(0)
        .prop("selected")
    ).toBeFalsy;
    expect(
      selectableList
        .find(ListItemText)
        .at(1)
        .prop("selected")
    ).toBeFalsy;
    expect(
      selectableList
        .find(ListItemText)
        .at(2)
        .prop("selected")
    ).toBeTruthy;
  });

  it("should render list with every item selected", () => {
    const items = ["Ana", "Carlos", "Beatriz"];
    const selectedIndexes = [0, 1, 2];
    const selectableList = shallow(
      <SelectableList items={items} selectedIndexes={selectedIndexes} />
    );
    expect(
      selectableList
        .find(ListItemText)
        .at(0)
        .prop("selected")
    ).toBeTruthy;
    expect(
      selectableList
        .find(ListItemText)
        .at(1)
        .prop("selected")
    ).toBeTruthy;
    expect(
      selectableList
        .find(ListItemText)
        .at(2)
        .prop("selected")
    ).toBeTruthy;
  });

  it("should call onItemClicked when an item is clicked", () => {
    const items = ["Ana", "Carlos", "Beatriz"];
    const onItemClicked = jest.fn();
    const indexToClick = 1;
    const selectableList = mount(
      <SelectableList items={items} onItemClicked={onItemClicked} />
    );

    selectableList
      .find(ListItemText)
      .at(indexToClick)
      .simulate("click");

    expect(onItemClicked).toHaveBeenCalledTimes(1);
    expect(onItemClicked).toHaveBeenCalledWith(indexToClick);
  });
});
