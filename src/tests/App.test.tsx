import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

test("renders feeds", () => {
  render(<App />);
  const feeds = screen.getByText("Feeds");
  expect(feeds).toBeInTheDocument();
});

test("renders cards", () => {
  render(<App />);
  waitFor(() => {
    const card = screen.getByText("JPY / USD");
    expect(card).toBeInTheDocument();
  });
});

test("click card + render feed", () => {
  render(<App />);
  waitFor(() => {
    const card = screen.getByText("JPY / USD");
    expect(card).toBeInTheDocument();
    card.click();
    const answer = screen.getByText("Latest Answer");
    const deviation = screen.getByText("Deviation Threshold");
    expect(answer).toBeInTheDocument();
    expect(deviation).toBeInTheDocument();
  });
});
