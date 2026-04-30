import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroCarousel } from "@/components/organisms/HeroCarousel";
import { heroSlides } from "@/lib/content";

describe("HeroCarousel", () => {
  it("renders the first slide and moves to the next slide", () => {
    render(<HeroCarousel slides={heroSlides} />);

    expect(
      screen.getByRole("heading", {
        name: /creamos páginas web listas para vender/i,
      }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /slide siguiente/i }));

    expect(
      screen.getByRole("heading", {
        name: /tu sitio sale con base técnica/i,
      }),
    ).toBeInTheDocument();
  });
});
