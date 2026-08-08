export function parseErrorMessage(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    if (error.name === "AbortError") {
      return "Operation Aborted";
    }

    return error.message;
  }

  return "Something went wrong";
}
