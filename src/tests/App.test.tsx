import React from "react";
import {
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "../App";

test("renders feeds", () => {
  render(<App />);
  const feeds = screen.getByText("Feeds");
  expect(feeds).toBeInTheDocument();
});

test("renders cards + click card", async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.queryByText("Loading..."), {
    timeout: 4000,
  });
  const card = await screen.findByText("JPY / USD");
  expect(card).toBeInTheDocument();
  card.click();
  await waitForElementToBeRemoved(() => screen.queryByText("Loading..."), {
    timeout: 4000,
  });
  const feedName = await screen.findByText("JPY / USD");
  const answer = await screen.findByText("Latest Answer");
  expect(feedName).toBeInTheDocument();
  expect(answer).toBeInTheDocument();
}, 8000);

afterEach(() => {
  cleanup();
});
