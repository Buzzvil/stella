import React from "react";
import renderer from "react-test-renderer";

import RatingDropdown from "./RatingDropdown";
import Star from "../Star/Star";

it("renders 5 stars by default", () => {
  const instance = renderer.create(<RatingDropdown value={0} />).root;
  const stars = instance.findAllByType(Star);
  expect(stars.length).toEqual(5);
});

it("renders star values of [0, 0, 0, 0, 0] for value of 0", () => {
  const instance = renderer.create(<RatingDropdown value={0} />).root;
  const stars = instance.findAllByType(Star);
  expect(stars.map(star => star.props.value)).toEqual([0, 0, 0, 0, 0]);
});

it("renders star values of [1, 1, 0.5, 0, 0] for value of 2.5", () => {
  const instance = renderer.create(<RatingDropdown value={2.5} />).root;
  const stars = instance.findAllByType(Star);
  expect(stars.map(star => star.props.value)).toEqual([1, 1, 0.5, 0, 0]);
});

it("renders star values of [1, 1, 0.5, 0, 0, 0] for value of 2.5 and count 6", () => {
  const instance = renderer.create(<RatingDropdown value={2.5} count={6} />).root;
  const stars = instance.findAllByType(Star);
  expect(stars.map(star => star.props.value)).toEqual([1, 1, 0.5, 0, 0, 0]);
});

it("renders star values of [1, 1, 1, 0, 0, 0] for value of 2.5, count 6, and max 5", () => {
  const instance = renderer.create(<RatingDropdown value={2.5} count={6} max={5} />)
    .root;
  const stars = instance.findAllByType(Star);
  expect(stars.map(star => star.props.value)).toEqual([1, 1, 1, 0, 0, 0]);
});
