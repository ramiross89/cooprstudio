import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/organisms/ContactForm";

describe("ContactForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("validates required fields before submitting", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /enviar proyecto/i }));

    expect(await screen.findByText(/escribe tu nombre completo/i)).toBeInTheDocument();
    expect(screen.getByText(/escribe un correo válido/i)).toBeInTheDocument();
    expect(screen.getByText(/cuéntanos un poco más/i)).toBeInTheDocument();
  });

  it("submits a valid lead to the mock API", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/nombre/i), "Rami Salinas");
    await user.type(screen.getByLabelText(/correo/i), "rami@example.com");
    await user.type(
      screen.getByLabelText(/mensaje/i),
      "Necesito una landing moderna para lanzar un nuevo servicio web.",
    );
    await user.click(screen.getByRole("button", { name: /enviar proyecto/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/leads",
      expect.objectContaining({ method: "POST" }),
    );
    expect(await screen.findByText(/recibido/i)).toBeInTheDocument();
  });
});
